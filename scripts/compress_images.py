import os
from PIL import Image

def optimize_images():
    dirs_to_check = [
        'public/images/edificio/',
        'public/',
        'public/Team images/',
        'public/Other images/'
    ]
    
    for d in dirs_to_check:
        if not os.path.exists(d):
            continue
        for f in os.listdir(d):
            if f.lower().endswith(('.jpg', '.jpeg', '.png')):
                path = os.path.join(d, f)
                try:
                    original_size = os.path.getsize(path)
                    if original_size < 500 * 1024 and not f.lower().endswith('.png'):
                        continue # Skip small JPEGs
                        
                    img = Image.open(path)
                    
                    # Resize if too large
                    max_width = 1920
                    if img.width > max_width:
                        ratio = max_width / img.width
                        new_height = int(img.height * ratio)
                        img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                    
                    # Save optimized
                    if f.lower().endswith('.png'):
                        img.save(path, optimize=True)
                    else:
                        # Convert to RGB if RGBA before saving as JPEG
                        if img.mode == 'RGBA':
                            img = img.convert('RGB')
                        img.save(path, 'JPEG', quality=85, optimize=True)
                        
                    new_size = os.path.getsize(path)
                    print(f"Compressed {f}: {original_size/1024/1024:.2f}MB -> {new_size/1024/1024:.2f}MB")
                except Exception as e:
                    print(f"Error compressing {f}: {e}")

if __name__ == '__main__':
    optimize_images()
