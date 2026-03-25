# Booking Form Specifications (Client Hair Profile)
**Author:** Oyewole Oluwabukola Oghenerukevwe

## Purpose
To define client hair profile fields required during the booking flow. These fields allow stylists to adequately prepare time, tools, and materials before accepting a job.

## Required Fields & Options

### 1. State / Condition of Client Hair
*To assess texture and required handling.*
- Natural (unrelaxed)
- Relaxed
- Transitioning (undergrowth)

### 2. Length of Client Hair
*To estimate prep time and blending difficulty.*
- Short
- Medium
- Long

### 3. Length of Chosen Hairstyle
*To calculate extension requirements and total duration.*
- Shoulder length
- Bra length
- Waist length
- Knee length

## Implementation Recommendations
1. Integrate these fields into the booking form UI schema.
2. Update the `bookings` database table to store these values (either as individual columns like `client_hair_condition`, `client_hair_length`, `desired_style_length`, or wrapped inside a `client_hair_profile` JSONB column).
3. Ensure these details are rendered in the Stylist Dashboard overview.
4. Include these selections in the booking confirmation email sent to both client and stylist.
