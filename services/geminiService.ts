import type { Topic, ContentData } from '../types';
import { COMMON_CONDITIONS_CONTENT } from '../content/commonConditions';
import { TREATMENT_RECOVERY_CONTENT } from '../content/treatmentRecovery';
import { DIAGNOSTICS_IMAGING_CONTENT } from '../content/diagnosticsImaging';
import { PATIENT_FAQS_CONTENT } from '../content/patientFaqs';

const ALL_CONTENT = {
  ...COMMON_CONDITIONS_CONTENT,
  ...TREATMENT_RECOVERY_CONTENT,
  ...DIAGNOSTICS_IMAGING_CONTENT,
  ...PATIENT_FAQS_CONTENT,
};

export const fetchTopicInfo = async (topic: Topic): Promise<ContentData> => {
  return new Promise((resolve, reject) => {
    const topicInfo = ALL_CONTENT[topic as keyof typeof ALL_CONTENT];

    if (topicInfo) {
      // Simulate network delay for UX consistency if needed, but for now, resolve immediately
      resolve(topicInfo);
    } else {
      console.error(`No content found for topic: ${topic}`);
      reject(new Error(`Sorry, we couldn't find any information on "${topic}".`));
    }
  });
};