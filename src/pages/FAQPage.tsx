import React from 'react';

const FAQPage: React.FC = () => {
  const faqs = [
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes. We ship to select countries worldwide, with delivery times varying by destination and local customs processing.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer hassle-free returns within 30 days for unworn items in their original packaging and condition.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'Most orders are dispatched within 48 hours and typically arrive within 5 to 10 business days depending on your location.',
    },
    {
      question: 'Do you use sustainable materials?',
      answer: 'We prioritize responsible sourcing, premium fabrics, and long-lasting materials designed to reduce unnecessary consumption.',
    },
    {
      question: 'Can I track my order?',
      answer: 'Yes. Once your order ships, you will receive a tracking number and can view the latest status in your account.',
    },
  ];

  return (
    <div className="container faq-page">
      <div className="page-hero">
        <h1>Frequently asked questions</h1>
        <p>Everything you need to know about styling, delivery, and shopping with CRESIA.</p>
      </div>

      <div className="faq-grid">
        {faqs.map((faq) => (
          <div key={faq.question} className="faq-item">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
