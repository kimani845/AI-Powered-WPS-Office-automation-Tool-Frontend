export interface ProcessRequest {
  prompt: string;
  content?: string;
}

export interface DocumentRequest {
  doc_type: string;
  topic: string;
  audience: string;
  tone: string;
  length: string;
}

export interface GeneralResponse {
  result: string;
}

export interface TranslationRequest {
  source_language: string;
  target_language: string;
  text: string;
}