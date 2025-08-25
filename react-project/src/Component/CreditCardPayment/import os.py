import os

import os

def rename_images_in_folder(folder_path, start_index=117):
    image_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp')
    images = [f for f in os.listdir(folder_path) if f.lower().endswith(image_extensions)]

    images.sort()

    for i, filename in enumerate(images):
        ext = os.path.splitext(filename)[1]
        new_name = f"image{start_index + i}{ext}"
        src = os.path.join(folder_path, filename)
        dst = os.path.join(folder_path, new_name)
        
        # אם השם החדש זהה לשם המקורי – דלג
        if filename == new_name:
            print(f"Skipped: {filename} already named correctly.")
            continue
        
        # בדוק אם הקובץ החדש כבר קיים כדי להימנע מדריסה
        if os.path.exists(dst):
            print(f"Warning: {dst} already exists. Skipping.")
            continue
        
        os.rename(src, dst)
        print(f"Renamed: {filename} -> {new_name}")



rename_images_in_folder(r"C:\Users\1\Music\JAVA\react-project\public\תמונות", start_index=1)
