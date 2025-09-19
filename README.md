# GDCompass - STI Risk Analyzer

A modern, responsive web application for assessing sexually transmitted infection (STI) risks and providing personalized testing recommendations.

## 🚀 Features

- **Interactive Risk Assessment**: Multi-step questionnaire to evaluate STI risk factors
- **Personalized Recommendations**: AI-driven suggestions for appropriate testing packages
- **Responsive Design**: Optimized for both mobile and desktop devices
- **Accessibility**: Built with accessibility best practices and high contrast support
- **Privacy-Focused**: No personal identification data collected
- **Multilingual Support**: Vietnamese language interface

## 📁 Project Structure

```
gdcompass/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles with BEM methodology
├── js/
│   └── app.js          # Modular JavaScript application
├── assets/             # Static assets (images, icons, etc.)
└── README.md           # Project documentation
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom properties, Flexbox, Grid, and responsive design
- **Vanilla JavaScript**: ES6+ with modular class-based architecture
- **Tailwind CSS**: Utility-first CSS framework (CDN)
- **Inter Font**: Modern typography from Google Fonts

## 🎨 Design System

### CSS Architecture
- **BEM Methodology**: Block-Element-Modifier naming convention
- **CSS Custom Properties**: Centralized design tokens
- **Mobile-First**: Responsive design starting from mobile devices
- **Component-Based**: Modular CSS components for reusability

### Color Palette
- **Primary**: Blue (#3b82f6)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Danger**: Red (#ef4444)
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font Family**: Inter (Google Fonts)
- **Scale**: Responsive font sizes using CSS custom properties
- **Line Height**: Optimized for readability (1.5-1.6)

## 🏗️ Architecture

### JavaScript Modules

#### 1. Configuration (`GD_CONFIG`)
Centralized configuration object containing:
- Step IDs and navigation constants
- Result types and flow types
- Animation durations

#### 2. Data Management
- **Symptoms Data**: Comprehensive symptom database with risk associations
- **Test Packages**: Available testing options and display names
- **Pathogen Descriptions**: Medical information for different STIs

#### 3. State Management (`GDAppState`)
- User answer tracking
- Navigation history
- Form state management

#### 4. DOM Management (`GDDOMManager`)
- Element selection and manipulation
- Step navigation and visibility
- Error handling and display

#### 5. Validation (`GDValidator`)
- Form validation logic
- Error message display
- Input requirement checking

#### 6. Results Generation (`GDResultsGenerator`)
- Dynamic result page creation
- Risk assessment algorithms
- Personalized recommendations

#### 7. Navigation (`GDStepNavigator`)
- Multi-step form navigation
- Back/forward functionality
- Conditional flow logic

#### 8. Checkbox Logic (`GDCheckboxManager`)
- Exclusive checkbox behavior
- Symptom selection logic
- Form interaction management

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 768px
- **Desktop**: 768px - 1024px
- **Large Desktop**: > 1024px

### Mobile Optimizations
- Touch-friendly button sizes (minimum 44px)
- Optimized form layouts
- Stacked navigation on small screens
- Readable font sizes

## ♿ Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user motion preferences
- **Focus Management**: Clear focus indicators

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. **Clone or Download** the project files
2. **Open** `index.html` in a web browser
3. **Or serve locally** using a web server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

### Development

1. **Edit** files in their respective directories
2. **Test** changes in multiple browsers
3. **Validate** HTML and CSS
4. **Check** accessibility with screen readers

## 🔧 Customization

### Adding New Symptoms
Edit the `GD_SYMPTOMS_DATA` array in `js/app.js`:

```javascript
{
  id: "s13",
  text: "New symptom description",
  risk: "Associated diseases",
  tests: ["Recommended test packages"]
}
```

### Modifying Styles
Update CSS custom properties in `css/styles.css`:

```css
:root {
  --gd-color-primary: #your-color;
  --gd-font-size-base: 1.1rem;
}
```

### Adding New Test Packages
Update the `GD_TEST_DISPLAY_NAMES` object in `js/app.js`:

```javascript
"New Test Package": "Display Name for New Test Package"
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] All form steps work correctly
- [ ] Navigation (back/forward) functions properly
- [ ] Results display appropriate recommendations
- [ ] Mobile responsiveness on various devices
- [ ] Accessibility with keyboard navigation
- [ ] Cross-browser compatibility

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is proprietary software developed for GD Health. All rights reserved.

## 🤝 Contributing

For internal development:
1. Follow the established code style
2. Test on multiple devices and browsers
3. Ensure accessibility compliance
4. Update documentation as needed

## 📞 Support

For technical support or questions:
- **Email**: tech@gdhealth.vn
- **Documentation**: See inline code comments
- **Issues**: Report bugs through internal channels

## 🔄 Version History

### v1.0.0 (Current)
- Initial release with complete STI risk assessment
- Responsive design implementation
- Accessibility features
- Modular JavaScript architecture

---

**Note**: This application is for educational and assessment purposes only. It does not replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns.

