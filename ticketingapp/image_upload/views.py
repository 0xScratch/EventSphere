from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import UploadedImage

class ImageUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        image_file = request.FILES.get('image')
        if not image_file:
            return Response({'error': 'No image file provided'}, status=status.HTTP_400_BAD_REQUEST)

        uploaded_image = UploadedImage.objects.create(image=image_file)
        return Response({'message': 'Image uploaded successfully', 'image_url': uploaded_image.image.url}, status=status.HTTP_201_CREATED)
