# Personal Website

A modern, responsive personal website designed to be hosted on GitHub Pages. Features a clean design with a main page and media gallery functionality.

## 🌟 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Profile Section**: Showcase your photo and personal information
- **Media Gallery**: Add media items with titles, links, and dates
- **Interactive**: Add and delete media items with persistent storage
- **Modern UI**: Clean, professional design with smooth animations
- **GitHub Pages Ready**: Static files that deploy seamlessly

## 📁 Project Structure

```
├── index.html          # Main homepage
├── media.html          # Media gallery page
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
├── pictures/           # Folder for images
│   ├── README.md       # Instructions for adding photos
│   └── profile.jpg     # Your profile photo (add this)
├── .github/
│   └── copilot-instructions.md
└── README.md           # This file
```

## 🚀 Getting Started

### 1. Add Your Profile Photo

1. Take or select a photo you want to use as your profile picture
2. Resize it to approximately 400x400 pixels (square format works best)
3. Save it as `profile.jpg` in the `pictures` folder
4. The photo will automatically appear on your main page

### 2. Customize Your Content

1. **Main Page**: Edit `index.html` to update:
   - Your name and welcome message
   - About section with your personal information
   - Any additional sections you want to add

2. **Styling**: Modify `styles.css` to:
   - Change color scheme
   - Adjust fonts and sizes
   - Customize the layout

### 3. Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Upload all project files to the repository
3. Go to repository Settings → Pages
4. Select "Deploy from a branch" and choose "main"
5. Your website will be available at `https://yourusername.github.io/repository-name`

## 📱 Using the Media Gallery

### Adding Media Items

1. Go to the Media page
2. Click "Add New Media"
3. Fill in the form:
   - **Title**: Name of your media item
   - **Link**: URL to the media (YouTube, article, etc.)
   - **Date**: When it was created or published
   - **Description**: Optional details about the media

### Managing Media Items

- Media items are stored locally in your browser
- Click "Delete" on any item to remove it
- Items persist between browser sessions

## 🎨 Customization Options

### Colors

The website uses a modern color palette that you can customize in `styles.css`:

- Primary: `#667eea` (purple-blue gradient)
- Dark: `#2c3e50` (dark blue-gray)
- Light: `#f8f9fa` (light gray background)

### Fonts

Currently uses system fonts for fast loading:
```css
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

### Layout

The design is fully responsive with breakpoints at:
- Mobile: 768px and below
- Tablet: 769px to 1199px
- Desktop: 1200px and above

## 🔧 Technical Details

- **Pure HTML/CSS/JavaScript**: No frameworks or build tools required
- **Local Storage**: Media items are saved in browser storage
- **Responsive Grid**: CSS Grid and Flexbox for modern layouts
- **Accessibility**: Semantic HTML and ARIA labels
- **Performance**: Optimized images and minimal dependencies

## 📝 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🤝 Contributing

This is a personal website template. Feel free to:
- Fork and customize for your own use
- Submit issues for bugs or suggestions
- Create pull requests for improvements

## 📄 License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

## 🚀 Next Steps

1. **Add your profile photo** to the `pictures` folder
2. **Customize the content** in `index.html`
3. **Test locally** by opening `index.html` in your browser
4. **Deploy to GitHub Pages** following the instructions above
5. **Share your website** with the world!

---

**Need Help?** 
- Check the `pictures/README.md` for photo instructions
- Review the code comments for customization guidance
- Test all features before deploying to GitHub Pages
