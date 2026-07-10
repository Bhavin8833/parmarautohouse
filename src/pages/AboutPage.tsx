import storePhoto from "@/assets/store-photo.jpg";
import { ShieldCheck, Truck, HeadphonesIcon, Award } from "lucide-react";

const AboutPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="font-display font-bold text-3xl mb-8">About Parmar Auto House</h1>
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      <div>
        <img src={storePhoto} alt="Parmar Auto House Store" className="w-full rounded-lg object-cover h-80" />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="font-display font-semibold text-xl mb-4">Your Trusted Auto Parts Partner</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Since 2005, Parmar Auto House has been a leading supplier of quality auto parts, bearings, hydraulic hoses, agricultural equipment, and industrial components in Gujarat, India.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          We pride ourselves on offering genuine products at competitive prices with exceptional customer service. Our team of experts is always ready to help you find the right parts for your needs.
        </p>
      </div>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { icon: ShieldCheck, title: "Genuine Parts", val: "100%" },
        { icon: Truck, title: "Orders Delivered", val: "50,000+" },
        { icon: HeadphonesIcon, title: "Happy Customers", val: "10,000+" },
        { icon: Award, title: "Years Experience", val: "19+" },
      ].map(f => (
        <div key={f.title} className="text-center p-6 bg-card rounded-lg border border-border">
          <f.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
          <p className="font-display font-bold text-2xl mb-1">{f.val}</p>
          <p className="text-sm text-muted-foreground">{f.title}</p>
        </div>
      ))}
    </div>
  </div>
);

export default AboutPage;
