from ..models import Conversation, Message
from ..ml.model import QwenModel

class ChatService:
    def __init__(self):
        self.model = QwenModel.get_instance()
    
    def create_conversation(self, title: str) -> Conversation:
        """Create a new conversation"""
        return Conversation.objects.create(title=title)
    
    def add_user_message(self, conversation: Conversation, content: str) -> Message:
        """Add a user message to the conversation"""
        return Message.objects.create(
            conversation=conversation,
            content=content,
            is_user=True
        )
    
    def generate_ai_response(self, conversation: Conversation, user_message: str) -> Message:
        """Generate and save AI response"""
        # Generate response using the model
        response = self.model.generate_response(user_message)
        
        # Save and return the AI message
        return Message.objects.create(
            conversation=conversation,
            content=response,
            is_user=False
        )