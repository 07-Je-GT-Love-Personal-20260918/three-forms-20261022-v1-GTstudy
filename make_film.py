"""Build the silent, offline historical route animation and its poster."""
from pathlib import Path
import os
import subprocess

import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont

assets = Path(__file__).resolve().parent / 'dist/assets'
fonts = Path(os.environ.get('WINDIR', 'C:/Windows')) / 'Fonts'
font_path = os.environ.get('GT_FILM_FONT', str(fonts / 'msyh.ttc'))
fonts_by_size = {size: ImageFont.truetype(font_path, size) for size in (22, 28, 56)}
chapters = [
    ('1561', '图尔奈', '公共告白：身处逼迫，仍说明教会所信', '#ffc4a7'),
    ('1563', '海德堡', '共同教导：安慰进入家庭、学校与讲台', '#ffd986'),
    ('1618—1619', '多德雷赫特', '大会辨明：恩典使人相信，也保守人到底', '#a1e2ca'),
]
points = [(220, 384), (480, 340), (740, 384)]
fps = 24

def frame(second, poster=False):
    index = min(int(second // 11), 2)
    year, city, text, color = chapters[index]
    image = Image.new('RGB', (960, 540), '#163532')
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((30, 30, 930, 510), 32, outline='#52766c', width=2)
    draw.text((480, 83), '三地研读路线' if poster else year, anchor='mm', font=fonts_by_size[28], fill=color)
    draw.text((480, 170), '三座城，同一福音' if poster else city, anchor='mm', font=fonts_by_size[56], fill='#fff8e2')
    if not poster:
        draw.text((480, 248), text, anchor='mm', font=fonts_by_size[28], fill='#dce8d8')
    draw.line(points, fill='#52766c', width=4)
    progress = min(1, (second % 11) / 2)
    if index:
        x, y = points[index - 1]
        end_x, end_y = points[index]
        draw.line([(x, y), (x + (end_x-x)*progress, y + (end_y-y)*progress)], fill=color, width=5)
    for i, (x, y) in enumerate(points):
        radius = 12 if poster or index == i else 7
        draw.ellipse((x-radius, y-radius, x+radius, y+radius), fill=chapters[i][3])
        draw.text((x, y+42), chapters[i][1], anchor='mm', font=fonts_by_size[22], fill='#fff8e2')
    draw.line((80, 475, 80 + 800 * (1 if poster else second / 32), 475), fill=color, width=3)
    return image

frame(0, poster=True).save(assets / 'route-poster.jpg', quality=88)
with subprocess.Popen([
    imageio_ffmpeg.get_ffmpeg_exe(), '-y', '-loglevel', 'error', '-f', 'rawvideo',
    '-pix_fmt', 'rgb24', '-s', '960x540', '-r', str(fps), '-i', '-',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '24',
    '-movflags', '+faststart', str(assets / 'route.mp4')
], stdin=subprocess.PIPE) as encoder:
    for tick in range(32 * fps):
        encoder.stdin.write(frame(tick / fps).tobytes())
    encoder.stdin.close()
    if encoder.wait():
        raise SystemExit('Video encoding failed')
