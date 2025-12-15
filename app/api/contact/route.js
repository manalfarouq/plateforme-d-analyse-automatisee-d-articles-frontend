import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation basique
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // ⚠️ OPTION 1: Envoi par Nodemailer (nécessite configuration SMTP)
    // Décommentez ce bloc si vous utilisez Nodemailer
    /*
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // ex: smtp.gmail.com
      port: process.env.SMTP_PORT, // ex: 587
      secure: false,
      auth: {
        user: process.env.SMTP_USER, // votre email
        pass: process.env.SMTP_PASS, // votre mot de passe d'application
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL, // votre email de réception
      subject: `Contact ZORO Analyzer: ${subject}`,
      html: `
        <h2>Nouveau message de ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    });
    */

    // ⚠️ OPTION 2: Envoi par Resend (recommandé - plus simple)
    // Décommentez ce bloc si vous utilisez Resend
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'ZORO Analyzer <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL,
      subject: `Contact: ${subject}`,
      html: `
        <h2>Nouveau message de ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    });
    */

    // Pour l'instant, on simule juste un succès
    console.log('Message reçu:', { name, email, subject, message });

    return NextResponse.json(
      { 
        success: true,
        message: 'Message envoyé avec succès' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}