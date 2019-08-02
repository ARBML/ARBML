# credit: https://stackoverflow.com/questions/765736/using-pil-to-make-all-white-pixels-transparent

from PIL import Image

img = Image.open(r'avatar-cropped-white-back.png')
img = img.convert("RGBA")
datas = img.getdata()

newData = []
threshold = 220
for item in datas:
    if item[0] >= threshold and item[1] >= threshold and item[2] >= threshold:
        newData.append((255, 255, 255, 0))
    else:
        newData.append(item)

img.putdata(newData)
img.save("avatar-cropped.png", "PNG")
