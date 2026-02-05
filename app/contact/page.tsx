"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import {
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Send,
} from "lucide-react";

const services = [
  "Residential Painting",
  "Commercial Painting",
  "Interior Painting",
  "Exterior Painting",
  "Roof Painting",
  "Other",
];

// Details added from image_783a00.png
const serviceAreas = [
  "Sydney CBD", "Eastern Suburbs", "Northern Beaches",
  "North Shore", "Inner West", "Western Sydney",
  "Southern Sydney", "Hills District"
];

export default function ContactPage() {
  const { toast } = useToast();
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    
    setIsSubmitting(true);

    emailjs
      .sendForm("service_whblhte", "template_avd2hnw", form.current, {
        publicKey: "m9zEMwN0BWa9Oy09U",
      })
      .then(
        () => {
          toast({
            variant: "default",
            description: "Your Message has been sent successfully!",
          });
          setIsSubmitted(true);
          form.current?.reset();
        },
        (error) => {
          console.error("EmailJS Error:", error);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem submitting your message. Please try again.",
          });
        }
      )
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="bg-muted py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 text-center">
             {/* Text matched to image_784963.png */}
            <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">CONTACT US</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Get Your Free Quote</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Ready to transform your space? Contact us today for a free, no-obligation quote. Our team is here to help bring your vision to life.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Side: Form */}
              <div className="lg:col-span-7">
                <h2 className="text-2xl font-bold mb-8">Send Us a Message</h2>
                {isSubmitted ? (
                  <div className="bg-primary/10 p-12 rounded-2xl text-center border border-primary/20">
                    <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                    <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                    <Button onClick={() => setIsSubmitted(false)} className="mt-8" variant="outline">Send another message</Button>
                  </div>
                ) : (
                  <form ref={form} onSubmit={onSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="from_name">Full Name *</Label>
                        <Input id="from_name" name="from_name" required placeholder="John Smith" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="from_email">Email Address *</Label>
                        <Input id="from_email" name="from_email" type="email" required placeholder="john@example.com" className="h-12" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" placeholder="+61 000 000 000" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service">Service Required</Label>
                        <select name="service" className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:ring-2 focus:ring-primary outline-none">
                          <option value="">Select a service</option>
                          {services.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea id="message" name="message" required rows={6} placeholder="Tell us about your project..." />
                    </div>
                    <Button type="submit" disabled={isSubmitting} size="lg" className="w-full sm:w-auto h-12 px-8">
                      {isSubmitting ? "Sending..." : <>Send Message <Send className="ml-2 w-4 h-4" /></>}
                    </Button>
                  </form>
                )}
              </div>

              {/* Right Side: Contact Information Sidebar - image_783a00.png */}
              <div className="lg:col-span-5 space-y-10">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Have questions or ready to start your painting project? Reach out to us through any of the following channels. We typically respond within 24 hours.
                  </p>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 border border-primary/20">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Phone</h3>
                        <a href="tel:+61415894507" className="text-muted-foreground hover:text-primary transition-colors text-lg">+61 415 894 507</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 border border-primary/20">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Email</h3>
                        <a href="mailto:info.majesticpainters@gmail.com" className="text-muted-foreground hover:text-primary transition-colors text-lg">info.majesticpainters@gmail.com</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 border border-primary/20">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Business Hours</h3>
                        <p className="text-muted-foreground text-lg">Mon - Fri: 7am - 5pm</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Areas Section from image_783a00.png */}
                <div className="bg-muted p-8 rounded-2xl border border-border/50">
                  <h3 className="font-bold text-xl mb-4">Service Areas</h3>
                  <p className="text-muted-foreground text-sm mb-6">We proudly serve the greater Sydney metropolitan area, including:</p>
                  <div className="grid grid-cols-2 gap-4">
                    {serviceAreas.map((area) => (
                      <div key={area} className="flex items-center gap-3 text-muted-foreground text-sm">
                        <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                        <span className="font-medium">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}