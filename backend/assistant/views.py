from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Conversation
from .serializers import ConversationSerializer, MessageSerializer
from .services.chat_service import ChatService

class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    chat_service = ChatService()

    @action(detail=True, methods=['post'])
    def chat(self, request, pk=None):
        conversation = self.get_object()
        user_message = request.data.get('message', '')
        
        # Save user message and generate response
        self.chat_service.add_user_message(conversation, user_message)
        ai_message = self.chat_service.generate_ai_response(
            conversation,
            user_message
        )

        return Response({
            'message': MessageSerializer(ai_message).data
        })