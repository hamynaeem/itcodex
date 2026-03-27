import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  contactForm: FormGroup;
  isSending = false;
  toastMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  private showToast(msg: string, ms = 3500) {
    this.toastMessage = msg;
    setTimeout(() => this.toastMessage = null, ms);
  }

  onSubmit() {
    if (!this.contactForm.valid) {
      this.showToast('Please fill in all fields correctly.');
      return;
    }

    const { name, email, message } = this.contactForm.value;
    const phone = '923036089020'; // target WhatsApp number (country code + number)
    const text = `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`;
    const waAppUrl = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(text)}`;
    const waWebUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    this.isSending = true;
    this.showToast('Opening WhatsApp to send your message...');

    try {
      const a = document.createElement('a');
      a.href = waAppUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        // Fallback to web if native app did not open
        window.open(waWebUrl, '_blank');
        this.isSending = false;
        this.showToast('If WhatsApp did not open, we opened the web chat.');
      }, 900);
    } catch (e) {
      window.open(waWebUrl, '_blank');
      this.isSending = false;
      this.showToast('Opened WhatsApp web chat.');
    }

    this.contactForm.reset();
  }
}
