import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="font-display font-bold text-3xl mb-8">Contact Us</h1>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="font-display font-semibold text-lg mb-4">Send us a Message</h2>
        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Name</label>
            <input type="text" className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <input type="email" className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Message</label>
            <textarea rows={5} className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
          </div>
          <button type="submit" className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors">
            Send Message
          </button>
        </form>
      </div>
      <div className="space-y-6">
        {[
          { icon: Phone, title: "Phone", info: "+91 98248 35163", href: "tel:+919824835163" },
          { icon: Mail, title: "Email", info: "Parmarautohouse2018@gmail.com", href: "mailto:Parmarautohouse2018@gmail.com" },
          { icon: MapPin, title: "Address", info: "Parmar Auto House, Bhavnagar road, Botad Gujarat -364710", href: "https://maps.app.goo.gl/NSzo8j8NUzxGzN4a9" },
          { icon: Clock, title: "Business Hours", info: "Mon-Sat: 9AM - 7PM", href: null },
        ].map(c => (
          <div key={c.title} className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border">
            <div className="p-2 rounded-md bg-primary/10"><c.icon className="h-5 w-5 text-primary" /></div>
            <div>
              <h3 className="font-semibold text-sm">{c.title}</h3>
              {c.href ? (
                <a href={c.href} target={c.title === "Address" ? "_blank" : undefined} rel={c.title === "Address" ? "noopener noreferrer" : undefined} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {c.info}
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">{c.info}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ContactPage;
