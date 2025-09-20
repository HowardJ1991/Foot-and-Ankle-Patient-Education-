import type { ContentMap } from '../types';

export const DIAGNOSTICS_IMAGING_CONTENT: ContentMap = {
  'Understanding Your X-Ray': {
    content: `### What is it?
An X-ray is a painless imaging test that creates pictures of the dense structures inside your body, especially bones. It is often the first step in diagnosing a foot or ankle injury.

### What it Shows
*   **Fractures:** X-rays are excellent for finding broken bones.
*   **Dislocations:** They can show if a joint is out of its normal position.
*   **Arthritis:** X-rays can reveal signs of arthritis, such as narrowed joint space and bone spurs.
*   **Alignment:** They help doctors assess the overall alignment of the bones in your foot.

This information is for educational purposes only and is not a substitute for professional medical advice. Always consult your doctor for diagnosis and treatment.`,
    sources: [{
      web: {
        uri: 'https://radiopaedia.org/articles/foot-radiograph-an-approach',
        title: 'Foot X-Ray (an approach) - Radiopaedia.org'
      }
    }]
  },
  'What an MRI Shows': {
    content: `### What is it?
Magnetic Resonance Imaging (MRI) uses a powerful magnet and radio waves to create highly detailed images of both bones and soft tissues like ligaments, tendons, and muscles.

### What it Shows
*   **Soft Tissue Injuries:** MRIs are the best tool for diagnosing ligament tears (like in severe ankle sprains), tendon ruptures (like the Achilles tendon), and cartilage damage.
*   **Stress Fractures:** They can detect small fractures that may not be visible on an X-ray.
*   **Other Issues:** MRIs can also help identify infections, tumors, and nerve-related problems.

This information is for educational purposes only and is not a substitute for professional medical advice. Always consult your doctor for diagnosis and treatment.`,
    sources: [{
      web: {
        uri: 'https://radiopaedia.org/articles/mri-of-the-ankle-an-approach',
        title: 'MRI of the ankle (an approach) - Radiopaedia.org'
      }
    }]
  },
  'CT Scans for the Foot': {
    content: `### What is it?
A Computed Tomography (CT or CAT) scan combines a series of X-ray images taken from different angles to create cross-sectional, 3D-like images of your bones.

### What it Shows
*   **Complex Fractures:** A CT scan provides much more detail than a regular X-ray, making it very useful for assessing complex fractures, especially those that involve a joint.
*   **Bone Healing:** It can be used to check if a bone is healing properly after surgery.
*   **Surgical Planning:** Surgeons often use CT scans to get a detailed map of the bones before a complex surgery.

This information is for educational purposes only and is not a substitute for professional medical advice. Always consult your doctor for diagnosis and treatment.`,
    sources: [{
      web: {
        uri: 'https://radiopaedia.org/articles/ct-foot-protocol',
        title: 'CT foot (protocol) - Radiopaedia.org'
      }
    }]
  },
  'Ultrasound for Tendons': {
    content: `### What is it?
An ultrasound uses high-frequency sound waves to create live images of soft tissues inside your body. It is a quick, non-invasive test often performed right in the doctor's office.

### What it Shows
*   **Tendon and Ligament Issues:** Ultrasound is excellent for looking at soft tissues, showing inflammation (tendinitis), tears, and other abnormalities in tendons and ligaments.
*   **Soft Tissue Masses:** It can help identify and characterize lumps and bumps like cysts or neuromas.
*   **Guided Injections:** Doctors can use ultrasound to guide a needle precisely to the right spot for a corticosteroid injection.

This information is for educational purposes only and is not a substitute for professional medical advice. Always consult your doctor for diagnosis and treatment.`,
    sources: [{
      web: {
        uri: 'https://radiopaedia.org/articles/achilles-tendinopathy',
        title: 'Achilles tendinopathy - Radiopaedia.org'
      }
    }]
  },
  'Gait Analysis': {
    content: `### What is it?
Gait analysis is a systematic study of how a person walks. A healthcare professional observes you walking to identify any biomechanical abnormalities in your feet, ankles, knees, and hips.

### What it Shows
*   **Abnormal Foot Mechanics:** It helps identify issues like overpronation (foot rolls too far inward) or supination (foot doesn't roll inward enough).
*   **Underlying Causes of Pain:** Analysis can reveal if your walking pattern is contributing to a chronic injury or pain.
*   **Treatment Planning:** The findings help doctors decide if you would benefit from physical therapy, specific exercises, or custom orthotics.

This information is for educational purposes only and is not a substitute for professional medical advice. Always consult your doctor for diagnosis and treatment.`,
    sources: []
  },
  'Nerve Conduction Studies': {
    content: `### What is it?
A nerve conduction study (NCS) is a test that measures how fast and how well the body's electrical signals travel along a nerve. It helps find nerve damage. It is often done along with an EMG (electromyography), which tests the electrical activity of muscles.

### What it Shows
*   **Pinched Nerves:** The test can help diagnose conditions like Tarsal Tunnel Syndrome (a pinched nerve at the ankle) or a pinched nerve in the back that is causing foot symptoms.
*   **Neuropathy:** It is used to identify damage to the peripheral nerves (peripheral neuropathy), which can cause numbness, tingling, or weakness in the feet.

This information is for educational purposes only and is not a substitute for professional medical advice. Always consult your doctor for diagnosis and treatment.`,
    sources: [{
      web: {
        uri: 'https://radiopaedia.org/articles/tarsal-tunnel-syndrome',
        title: 'Tarsal Tunnel Syndrome Imaging - Radiopaedia.org'
      }
    }]
  }
};