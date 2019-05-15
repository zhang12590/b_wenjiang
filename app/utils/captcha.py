# string模块自带数字、字母、特殊字符变量集合，不需要我们手写集合
import string
import random
import os
import uuid
import config
from PIL import Image, ImageDraw, ImageFont


class Code(object):
    # 生成随机生成数字或字母
    def random_hexdigits(self, len=1):
        return random.sample(string.hexdigits, len)

    # 生成干扰字符
    def punctuation(self, len=1):
        return tuple(random.sample(string.punctuation, len))

    # 定义干扰字符颜色
    def random_color(self, min=64, max=255):
        return tuple((random.randint(min, max) for i in range(3)))

    # 生成验证码
    def creat_code(self, width=80, height=24, color=(255, 255, 255)):
        image = Image.new('RGB', (width, height), color)
        # 建议下载几款字体，变换下风格，我在setting粒定义了static路径，这里就直接导入了
        font = ImageFont.truetype(os.path.join(config.STATICPATH, 'fonts/Lora-Regular.ttf'), 20)
        draw = ImageDraw.Draw(image)
        self.fill_color(draw, image, 5)
        self.fill_dischar(draw, image, 10)
        code = self.fill_char(draw, image, 4, 10, font)
        image_name = '{}.jpeg'.format(uuid.uuid4().hex)
        image_path = os.path.join(config.STATICPATH, 'code/{}'.format(image_name))
        image.save(image_path)
        return {'code': code, 'image_path': image_path}

    # 填充颜色
    def fill_color(self, draw, image, interval):
        for i in range(0, image.width, interval):
            for j in range(0, image.height, interval):
                draw.point((i, j), fill=self.random_color())

    # 填充验证码
    def fill_dischar(self, draw, image, interval):
        for i in range(0, image.width, interval):
            dis = self.punctuation()
            j = random.randrange(3, image.height - 3)
            draw.text((i, j), dis[0], fill=self.random_color(64, 255))

    # 填充验证码
    def fill_char(self, draw, image, num, interval, font):
        code = ''
        for i in range(num):
            cha = self.random_hexdigits()
            code += str(cha[0])
            j = random.randrange(0, 5)
            # print(cha)
            # print(image.width*(i/num)+interval,j)
            draw.text((image.width * (i / num) + interval, j), cha[0], fill=self.random_color(32, 127), font=font)
        return code
