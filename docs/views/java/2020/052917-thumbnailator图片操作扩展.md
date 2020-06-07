---
title: thumbnailator 图片操作介绍及扩展
date: 2020-05-26
tags:
 - 工作总结
categories:
 - JavaScript
 - 代码片段
 - 工作总结
---

[thumbnailator 传送门](https://github.com/coobird/thumbnailator)
> 记一次图片处理过程

## thumbnailator 功能

### 1. 从现有图像创建高质量的缩略图   

```java
BufferedImage thumbnail = Thumbnails.of(originalImage)
        .size(WIDTH, HEIGHT)
        .asBufferedImage();

Thumbnails.of(new File("original.jpg"))
        .size(160, 160)
        .toFile(new File("thumbnail.jpg"));
```

### 2. 可以在缩略图中嵌入水印(例如徽标)   

```java
Thumbnails.of(new File("original.jpg"))
        .size(160, 160)
        .rotate(90)
        .watermark(Positions.BOTTOM_RIGHT, ImageIO.read(new File("watermark.png")), 0.5f)
        .outputQuality(0.8)
        .toFile(new File("image-with-watermark.jpg"));
```

### 3. 水印的透明度是可调的，从透明(0%)到不透明(100%)

### 4. 支持图片旋转
```java
BufferedImage originalImage = ImageIO.read(new File("original.jpg"));

BufferedImage thumbnail = Thumbnails.of(originalImage)
        .size(200, 200)
        .rotate(90)
        .asBufferedImage();
```
### 5. 编程过程简化

### 6. 支持批量操作
```java
for (int i : new int[] {0, 90, 180, 270, 45}) {
    Thumbnails.of(new File("coobird.png"))
            .size(100, 100)
            .rotate(i)
            .toFile(new File("image-rotated-" + i + ".png"));
}
```
### 7. 可直接操作网络图片
```java
Thumbnails.of(new URL(card.getAvatarUrl()));
```
## 扩展

### 1.ImageFilter 的扩展

#### ImageFilter
```java
public interface ImageFilter
{
	/**
	 * Applies a image filtering operation on an image.
	 * 
	 * @param img		The image to apply the filtering on.
	 * @return			The resulting image after applying this filter.
	 */
	public BufferedImage apply(BufferedImage img);
}
```
#### 将图片转化为圆形
```java
  private static final ImageFilter CUT_CIRCLE =
      (bufferedImage) -> {
        int width = bufferedImage.getWidth(), height = width;
        BufferedImage circleBuffer = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g2 = circleBuffer.createGraphics();
        g2.setClip(new Ellipse2D.Float(0, 0, width, width));
        g2.drawImage(bufferedImage, 0, 0, width, height, null);
        return circleBuffer;
      };
```
#### 使用方式
```java
   BufferedImage avatar =
        Thumbnails.of(new URL(card.getAvatarUrl()))
            .size(315, 315)
            .addFilter(CUT_CIRCLE)
            .asBufferedImage();
```

##  2.Position 的扩展
#### Position 源码
```java
public interface Position
{
	/**
	 * Calculates the position of an object enclosed by an enclosing object.
	 * 
	 * @param enclosingWidth		The width of the enclosing object that is
	 * 								to contain the enclosed object.
	 * @param enclosingHeight		The height of the enclosing object that is
	 * 								to contain the enclosed object.
	 * @param width					The width of the object that is to be
	 * 								placed inside an enclosing object.
	 * @param height				The height of the object that is to be
	 * 								placed inside an enclosing object.
	 * @param insetLeft				The inset on the left-hand side of the
	 * 								object to be enclosed.
	 * @param insetRight			The inset on the right-hand side of the
	 * 								object to be enclosed.
	 * @param insetTop				The inset on the top side of the
	 * 								object to be enclosed.
	 * @param insetBottom			The inset on the bottom side of the
	 * 								object to be enclosed.
	 * @return						The position to place the object.
	 */
	public Point calculate(
			int enclosingWidth, int enclosingHeight, int width,	int height,
			int insetLeft, int insetRight, int insetTop, int insetBottom
	);
}

```
#### 自动设置水平居中,使用时只需指定垂直高度
```java
public static class Horizontally implements Position {
    private final int height;

    public Horizontally(int height) {
      this.height = height;
    }

    @Override
    public Point calculate(
        int enclosingWidth,
        int enclosingHeight,
        int width,
        int height,
        int insetLeft,
        int insetRight,
        int insetTop,
        int insetBottom) {
      int x = (enclosingWidth / 2)-(width / 2);
      return new Point(x, this.height + insetTop);
    }
  }
```