import type { BaseCategory } from './types';

// FIX: Added 'Home Physical Therapy' category and re-organized topics.
// FIX: Updated the type annotation to use `BaseCategory` to resolve a circular dependency with `types.ts`.
export const CATEGORIES: Record<BaseCategory, string[]> = {
  'Treatment & Recovery': [
    'Using Crutches',
    'Casting and Splinting Care',
    'FAQ: Post-Surgery Questions',
    'General Rehab Protocols',
    'Post-Op Pain Medication Guide',
    'Post-Op DC Instructions (Non-Weightbearing)',
    'Post-Op DC Instructions (Weightbearing)',
    'Transition to Boot & Wound Care: Achilles Repair',
    'Transition to Boot (Non-Weightbearing)',
    'Transition to Boot (Weightbearing)',
    'Wound Care: Forefoot Surgery',
  ],
  'Diagnostics & Imaging': [
    'Understanding Your X-Ray',
    'What an MRI Shows',
    'CT Scans for the Foot',
    'Ultrasound for Tendons',
    'Gait Analysis',
    'Nerve Conduction Studies',
  ],
  'Patient Information & Products': [
    'Ankle Fusion vs. Ankle Replacement',
    'Calf Stretcher Product Guide',
    'Cica-Care Silicone Gel Adhesive sheet',
    'For High arch (cavovarus feet): Donjoy Arch Rival orthotics',
    'EVENup Shoe Balancer Product',
    'Knee Scooter Product Guide',
    'Plantar Fasciitis Overview',
    'Shoe Guide (General)',
    'Shoe Lacing Technique',
    'Vitamin D Supplement (OTC)',
    '10 Tips for Healthier Weight',
    'Achilles Rupture: Surgery vs. No Surgery',
    'Stretching Exercises',
  ],
};