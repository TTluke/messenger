from PIL import Image
import os

# Get the current directory
current_directory = os.getcwd()

# Loop through all files in the current directory
for filename in os.listdir(current_directory):
    if filename.endswith(".png"):
        # Open the image
        img = Image.open(os.path.join(current_directory, filename))
        
        # Resize the image to 200x200
        img = img.resize((200, 200))
        
        # Save the resized image, overwriting the original file
        img.save(os.path.join(current_directory, filename))

print("Resizing complete. All PNG files have been overwritten.")

