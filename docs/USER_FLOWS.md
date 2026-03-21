# GlamGo Hackathon User Flows
This document outlines the core user journey paths that we are building for the Hackathon MVP.

---

## 1. Client Booking (Happy Path MVP)
This is the **primary flow** that the judges will see during the demo. It emphasizes the journey from inspiration to secure escrow payment.

```mermaid
flowchart TD
    %% Styling
    classDef page fill:#111,stroke:#333,stroke-width:2px,color:#fff,rx:8px,ry:8px;
    classDef action fill:#FF4081,stroke:#C2185B,stroke-width:2px,color:#fff,rx:4px,ry:4px;
    classDef payment fill:#388E3C,stroke:#1B5E20,stroke-width:2px,color:#fff,rx:4px,ry:4px;
    classDef external fill:#f39c12,stroke:#d68910,stroke-width:2px,color:#fff,rx:4px,ry:4px;
    
    A[📱 Open App]:::page --> B[🖼️ View Premium Gallery]:::page
    
    B --> C{Filter/Search}
    C -->|Braid, Locs, etc.| D[✨ View Style Details]:::page
    
    D -->|See Description & Images| E[Stylists Available for this Style]:::page
    
    E --> F([Select Stylist]):::action
    F --> G[📅 Select Date & Time slot]:::page
    
    G --> H([Confirm Location Address]):::action
    H --> I[💳 Booking & Payment Summary]:::page
    
    I -->|Redirect| J([💸 Interswitch Payment Gateway]):::external
    J -->|Success Verify| K[✅ Booking Confirmed]:::payment
    
    K --> L>Generate 4-Digit Confirmation Code]
    K --> M{Service Day}
    
    M --> N[Stylist Arrives & Performs Service]
    N --> O([Client Gives Code to Stylist]):::action
    O --> P[🔒 Escrow Funds Released to Stylist]:::payment
    
    P --> Q([⭐ Client Leaves Review]):::action
    Q --> R[Dashboard]:::page
```

---

## 2. Stylist Onboarding & Fulfillment
The secondary flow showing how stylists get onto the platform and receive their payouts.

```mermaid
flowchart TD
    %% Styling
    classDef page fill:#111,stroke:#333,stroke-width:2px,color:#fff,rx:8px,ry:8px;
    classDef action fill:#FF4081,stroke:#C2185B,stroke-width:2px,color:#fff,rx:4px,ry:4px;
    classDef payment fill:#388E3C,stroke:#1B5E20,stroke-width:2px,color:#fff,rx:4px,ry:4px;
    
    A[📱 Stylist Sign Up]:::page --> B[📸 Complete Profile & Portfolio]:::page
    B --> C([Link Pre-defined Styles they can do]):::action
    C --> D[Set Pricing for each Style]:::page
    
    D --> E{Wait for Client Booking}
    E -->|Notification| F[🔔 New Booking Request]:::page
    
    F --> G([Accept Request]):::action
    
    G --> H[🚗 Travel to Client on Specified Date]
    H --> I[✂️ Perform Hair Service]
    
    I --> J([Receive 4-Digit Code from Client]):::action
    J --> K[Input Code in App]:::page
    K --> L[💰 Funds Transferred to Stylist Wallet]:::payment

```
