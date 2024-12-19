from transformers import AutoModelForCausalLM, AutoTokenizer
from typing import Optional
import torch

class QwenModel:
    _instance: Optional['QwenModel'] = None
    _model = None
    _tokenizer = None
    
    def __init__(self):
        if QwenModel._instance is not None:
            raise RuntimeError("Use get_instance() instead")
        self._load_model()
    
    @classmethod
    def get_instance(cls) -> 'QwenModel':
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance
    
    def _load_model(self):
        """Load the Qwen model and tokenizer"""
        model_name = "Qwen/Qwen1.5-0.5B"
        self._tokenizer = AutoTokenizer.from_pretrained(
            model_name, 
            trust_remote_code=True
        )
        self._model = AutoModelForCausalLM.from_pretrained(
            model_name,
            trust_remote_code=True,
            device_map="auto"  # Automatically choose best device
        )
    
    def generate_response(self, prompt: str, max_length: int = 100) -> str:
        """Generate a response for the given prompt"""
        inputs = self._tokenizer(prompt, return_tensors='pt')
        
        # Move inputs to the same device as the model
        inputs = {k: v.to(self._model.device) for k, v in inputs.items()}
        
        with torch.no_grad():
            outputs = self._model.generate(
                **inputs,
                max_length=max_length,
                num_return_sequences=1,
                pad_token_id=self._tokenizer.pad_token_id,
                temperature=0.7,
                top_p=0.9
            )
        
        return self._tokenizer.decode(outputs[0], skip_special_tokens=True)