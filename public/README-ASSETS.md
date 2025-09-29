# Public Assets Directory

This directory contains all the static assets for the CIES IIT Jodhpur homepage.

## Required Assets

### 🖼️ Logo Images

- `iitj-logo.png` - IIT Jodhpur official logo (120x48px recommended)
- `logo.jpg` - CIES logo (48x48px, will be rounded to circular)

### 🎨 Favicon Files

Generate these from your logo using [favicon.io](https://favicon.io/):

- `favicon.ico` - Main favicon (32x32, 16x16 multi-size ICO)
- `favicon-16x16.png` - 16x16 PNG favicon
- `favicon-32x32.png` - 32x32 PNG favicon
- `apple-touch-icon.png` - 180x180 Apple touch icon
- `android-chrome-192x192.png` - 192x192 Android icon
- `android-chrome-512x512.png` - 512x512 Android icon

### 📱 Social Media Images

- `og-image.jpg` - Open Graph image for social sharing (1200x630px)
- `twitter-image.jpg` - Twitter card image (1200x630px)

### 📸 Screenshots (for PWA)

- `screenshot-desktop.png` - Desktop view screenshot (1280x720px)
- `screenshot-mobile.png` - Mobile view screenshot (375x812px)

## Current Status

✅ **Configured Files:**

- `manifest.json` - PWA manifest
- `robots.txt` - Search engine instructions
- `sitemap.xml` - Site structure for SEO

⏳ **Missing Assets (Replace placeholders):**

- Logo images (currently using placeholder URLs)
- Favicon files (placeholder text file exists)
- Social media images
- PWA screenshots

## Asset Guidelines

### Logo Requirements

- **Format**: PNG with transparent background preferred
- **Quality**: High resolution, vector-based preferred
- **Colors**: Should work on both light and dark backgrounds
- **IITJ Logo**: Official IIT Jodhpur branding guidelines
- **CIES Logo**: Civil Engineering Society official logo

### Favicon Generation

1. Use your main logo as source
2. Visit [favicon.io](https://favicon.io/)
3. Upload your logo
4. Download the generated favicon package
5. Extract all files to this `public/` directory

### Social Media Images

- **Dimensions**: 1200x630px (Facebook/Twitter standard)
- **Content**: Include CIES logo, IIT Jodhpur branding, and key text
- **Format**: JPG or PNG
- **File size**: Under 1MB for optimal loading

### PWA Screenshots

- **Desktop**: 1280x720px showing full homepage
- **Mobile**: 375x812px showing mobile responsive design
- **Format**: PNG with good compression
- **Quality**: High enough to showcase the design clearly

## File Naming Convention

Use lowercase with hyphens for all files:

- ✅ `iitj-logo.png`
- ✅ `android-chrome-192x192.png`
- ❌ `IITJ_Logo.PNG`
- ❌ `androidChrome192x192.png`

## Optimization Tips

1. **Compress Images**: Use tools like TinyPNG or ImageOptim
2. **WebP Format**: Consider WebP versions for better performance
3. **Lazy Loading**: Large images will be lazy-loaded automatically
4. **Alt Text**: All images have descriptive alt text in the code

## Replacement Instructions

1. **Replace Placeholder URLs**: Update the image sources in `app/page.tsx`

   ```tsx
   // Current placeholder:
   <img src="https://placehold.co/120x48/0b3d91/ffffff?text=IITJ" />

   // Replace with:
   <img src="/iitj-logo.png" alt="IIT Jodhpur Logo" />
   ```

2. **Update Manifest**: Ensure all icon paths in `manifest.json` point to real files

3. **Test PWA**: Use Chrome DevTools > Application > Manifest to verify all assets load

## Getting Official Assets

### IIT Jodhpur Logo

- Contact: IIT Jodhpur Administration
- Website: [iitj.ac.in](https://iitj.ac.in)
- Ensure you have permission to use official branding

### CIES Logo

- Contact: Civil Engineering Society leadership
- Ensure logo follows IIT Jodhpur branding guidelines
- Consider creating variations for different backgrounds

## Support

For questions about asset requirements or implementation:

- Check the main README.md
- Review Next.js image optimization docs
- Contact the development team
