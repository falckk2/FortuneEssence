import { useState } from 'react'
import './App.css'

const SECTIONS = [
    { key: 'benefits', label: 'Benefits' },
    { key: 'testimonials', label: 'Testimonials' },
    { key: 'about', label: 'About' },
    { key: 'usage', label: 'How to Use' },
]

export default function LandingPage() {
    const [activeSection, setActiveSection] = useState('benefits')

    return (
        <div>
            <section className="fe-hero">
                <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                    alt="Lavender Oil Bottle"
                    className="fe-hero-img"
                />
                <div className="fe-hero-content">
                    <h2 className="fe-lavender-title">Pure Lavender Oil</h2>
                    <p>
                        Experience the calming and rejuvenating effects of our premium lavender oil. Sourced from the finest fields, Fortune Essence brings you nature's best at an affordable price.
                    </p>
                </div>
            </section>
            <nav className="fe-section-nav">
                {SECTIONS.map((section) => (
                    <button
                        key={section.key}
                        className={`fe-section-nav-btn${activeSection === section.key ? ' active' : ''}`}
                        onClick={() => setActiveSection(section.key)}
                    >
                        {section.label}
                    </button>
                ))}
            </nav>
            {activeSection === 'benefits' && (
                <section className="fe-section fe-benefits">
                    <h3>Why Choose Fortune Essence?</h3>
                    <ul>
                        <li>100% Pure & Natural Lavender Oil</li>
                        <li>Ethically Sourced from Trusted Farms</li>
                        <li>Perfect for Aromatherapy, Skincare, and Relaxation</li>
                    </ul>
                </section>
            )}
            {activeSection === 'testimonials' && (
                <section className="fe-section fe-testimonials">
                    <h3>What Our Customers Say</h3>
                    <div className="fe-testimonial-list">
                        <blockquote>
                            "Absolutely love the scent and quality!"<br />
                            <span>- Customer A</span>
                        </blockquote>
                        <blockquote>
                            "A little goes a long way. Highly recommend!"<br />
                            <span>- Customer B</span>
                        </blockquote>
                    </div>
                </section>
            )}
            {activeSection === 'about' && (
                <section className="fe-section fe-about">
                    <h3>About Us</h3>
                    <p>
                        Fortune Essence is dedicated to bringing you the finest lavender oil, crafted with care and passion. Our mission is to make luxury wellness accessible to everyone.
                    </p>
                </section>
            )}
            {activeSection === 'usage' && (
                <section className="fe-section fe-usage">
                    <h3>How to Use</h3>
                    <ul>
                        <li>Add a few drops to your diffuser for a calming aroma</li>
                        <li>Mix with carrier oil for a soothing massage</li>
                        <li>Enhance your skincare routine with natural lavender</li>
                    </ul>
                </section>
            )}
        </div>
    )
} 