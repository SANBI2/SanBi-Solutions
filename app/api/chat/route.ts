import { NextResponse } from 'next/server';

// Define the model URL - using a conversational model
const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium";

// Comprehensive website knowledge base
const websiteInfo = {
  company: {
    name: "SanBi Solutions",
    description: "A leading cybersecurity company providing comprehensive security solutions",
    expertise: "Specializing in advanced cybersecurity solutions and digital asset protection",
  },
  services: [
    {
      name: "Network Security",
      description: "Protect your network infrastructure with advanced threat detection and prevention",
      features: [
        "24/7 network monitoring",
        "Firewall management",
        "Intrusion detection and prevention",
        "VPN solutions"
      ]
    },
    {
      name: "Endpoint Security",
      description: "Secure all your devices with comprehensive endpoint protection",
      features: [
        "Device management",
        "Antivirus protection",
        "Patch management",
        "Access control"
      ]
    },
    {
      name: "Data Protection",
      description: "Keep your data safe and private with advanced encryption",
      features: [
        "Data encryption",
        "Backup solutions",
        "Data loss prevention",
        "Compliance management"
      ]
    },
    {
      name: "Incident Response",
      description: "Quick response to security incidents with expert handling",
      features: [
        "24/7 incident response team",
        "Threat investigation",
        "Recovery planning",
        "Post-incident analysis"
      ]
    },
    {
      name: "Security Awareness Training",
      description: "Train your team in security best practices",
      features: [
        "Interactive training sessions",
        "Phishing simulations",
        "Security workshops",
        "Compliance training"
      ]
    }
  ],
  stats: {
    clientsProtected: 500,
    uptimePercentage: 99.9,
    threatsBlockedMonthly: 15000,
    countriesServed: 24
  },
  features: [
    "24/7 Security Monitoring",
    "Advanced Threat Detection",
    "Cybersecurity Consulting",
    "Security Audits"
  ]
};

async function generateResponse(message: string) {
  try {
    // Process common website-related queries
    const lowerMessage = message.toLowerCase();
    
    // Handle service-related queries
    if (lowerMessage.includes('services') || lowerMessage.includes('what do you offer')) {
      return `We offer the following services:\n${websiteInfo.services
        .map(service => `• ${service.name}: ${service.description}`)
        .join('\n')}`;
    }

    // Handle specific service inquiries
    const serviceQuery = websiteInfo.services.find(service => 
      lowerMessage.includes(service.name.toLowerCase())
    );
    if (serviceQuery) {
      return `Our ${serviceQuery.name} service includes:\n${serviceQuery.features
        .map(feature => `• ${feature}`)
        .join('\n')}`;
    }

    // Handle company information queries
    if (lowerMessage.includes('about') || lowerMessage.includes('company')) {
      return `${websiteInfo.company.name} is ${websiteInfo.company.description}. ${websiteInfo.company.expertise}. We serve ${websiteInfo.stats.clientsProtected} clients across ${websiteInfo.stats.countriesServed} countries with a ${websiteInfo.stats.uptimePercentage}% uptime.`;
    }

    // Handle statistics queries
    if (lowerMessage.includes('stats') || lowerMessage.includes('numbers')) {
      return `Here are our key statistics:\n• Protecting ${websiteInfo.stats.clientsProtected} clients\n• ${websiteInfo.stats.uptimePercentage}% uptime\n• Blocking ${websiteInfo.stats.threatsBlockedMonthly} threats monthly\n• Serving ${websiteInfo.stats.countriesServed} countries`;
    }

    // Update the API call format
    const response = await fetch(HUGGING_FACE_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `Context: I am an AI assistant for ${websiteInfo.company.name}, ${websiteInfo.company.description}. 
                Question: ${message}`,
        parameters: {
          max_length: 150,
          temperature: 0.7,
          top_p: 0.9,
          return_full_text: false
        }
      }),
    });

    const result = await response.json();
    
    if (result.error) {
      if (result.error.includes("loading")) {
        // Model is loading, provide a temporary response
        return "I'm just warming up. Please try again in a few seconds.";
      }
      throw new Error(result.error);
    }

    // Handle the response format
    const aiResponse = Array.isArray(result) ? result[0]?.generated_text : result.generated_text;
    return aiResponse || "I apologize, but I couldn't process that request.";

  } catch (error) {
    console.error('Error generating response:', error);
    return "I apologize, but I'm having trouble processing your request. Please try asking about our services or company information.";
  }
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const response = await generateResponse(message);
    
    return NextResponse.json({
      message: response,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 