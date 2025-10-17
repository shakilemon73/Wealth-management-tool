# WealthVision Pro - Design Guidelines
## Next-Generation Wealth Management Platform

---

## Design Approach

**Reference-Based Strategy:** Drawing inspiration from premium fintech leaders—Stripe's sophisticated minimalism, Linear's clean typography, and Robinhood's approachable data visualization—combined with enterprise-grade wealth management expertise. This creates a platform that feels both powerful and effortless.

**Design Philosophy:** Sophisticated Minimalism meets Intelligent Storytelling. Every pixel serves a purpose, every animation enhances understanding, and every interaction feels fluid and purposeful.

---

## Core Design Principles

1. **Intelligent Simplicity** - Complex financial data presented through intuitive, visual narratives
2. **Speed Without Sacrifice** - Fastest workflows without compromising depth or accuracy  
3. **Visual Storytelling** - Data becomes engaging stories, not intimidating numbers
4. **Mobile-First Excellence** - Designed for touch, scaled to desktop perfection
5. **Collaborative by Nature** - Real-time co-editing and seamless advisor-client flow

---

## Color System

### Primary Palette
- **Wealth Navy:** `217 85% 16%` - Primary brand, trust, headers, navigation
- **Growth Green:** `158 64% 52%` - Positive metrics, success states, growth indicators
- **Intelligence Blue:** `217 91% 60%` - Interactive elements, links, focus states
- **Caution Amber:** `38 92% 50%` - Alerts, warnings, attention-needed items

### Supporting Colors
- **Cloud White:** `0 0% 100%` - Primary background, card surfaces
- **Slate 100:** `210 20% 98%` - Subtle backgrounds
- **Slate 400:** `215 16% 47%` - Secondary text, icons
- **Slate 600:** `215 19% 35%` - Body text
- **Slate 900:** `222 47% 11%` - Headlines, dark mode base
- **Midnight:** `217 33% 17%` - Dark mode backgrounds

### Gradient System
- **Wealth Gradient:** Navy → Intelligence Blue (hero sections, CTAs)
- **Success Gradient:** Growth Green → Emerald `160 84% 39%` (positive outcomes)
- **Premium Gradient:** `258 90% 66%` → `330 81% 60%` (pro features, highlights)

---

## Typography

### Font Families
- **Primary:** Inter - All UI text, high readability at all sizes
- **Display:** Cabinet Grotesk - Bold headlines, hero text, impact statements
- **Monospace:** JetBrains Mono - Financial numbers, data tables, calculations

### Type Scale
- **Display:** 48px/56px, Cabinet Grotesk Bold - Hero headlines
- **H1:** 36px/44px, Cabinet Grotesk SemiBold - Page titles
- **H2:** 30px/38px, Inter SemiBold - Section headers
- **H3:** 24px/32px, Inter SemiBold - Card titles, subsections
- **H4:** 20px/28px, Inter Medium - Component headers
- **Body Large:** 18px/28px, Inter Regular - Important descriptions
- **Body:** 16px/24px, Inter Regular - Standard text
- **Small:** 14px/20px, Inter Regular - Secondary info
- **Micro:** 12px/16px, Inter Medium - Labels, captions

### Financial Numbers
- Use JetBrains Mono at 20-32px for dollar amounts
- Tabular numerals for aligned columns
- Color: Growth Green (positive), `0 84% 60%` red (negative), Slate 900 (neutral)

---

## Layout System

### Spacing Primitives
**Consistent Tailwind Units:** `2, 3, 4, 6, 8, 12, 16, 20, 24, 32`

- **Component Padding:** p-6 (cards), p-8 (large containers)
- **Section Spacing:** py-16 (mobile), py-24 (desktop)
- **Grid Gaps:** gap-4 (tight), gap-6 (standard), gap-8 (spacious)
- **Element Margins:** mb-2 (tight), mb-4 (standard), mb-6 (sections)

### Grid Systems
- **Dashboard:** 12-column responsive grid with gap-6
- **Cards:** 2-3 columns on desktop, single on mobile
- **Forms:** Single column max-w-2xl centered
- **Analytics:** Flexible grid adapting to chart sizes

### Container Widths
- **Full Platform:** max-w-screen-2xl mx-auto px-6
- **Content Sections:** max-w-6xl
- **Forms/Text:** max-w-2xl
- **Narrow Focus:** max-w-xl

---

## Component Library

### Navigation
**Top Navigation Bar**
- Height: 64px, Wealth Navy background with subtle border-b
- Logo: Left-aligned with 32px height
- Navigation items: Inter Medium 15px, Slate 200 with hover Intelligence Blue
- Right section: Notifications bell, user avatar (40px rounded-full), search icon
- Sticky position with backdrop-blur effect on scroll

**Sidebar (Advisor Portal)**
- Width: 280px, Slate 900 background in dark mode
- Navigation groups with 14px uppercase labels (Slate 400)
- Items: 16px Inter Medium with icon (20px) left-aligned
- Active state: Intelligence Blue background with opacity-10, border-l-4 Intelligence Blue
- Hover: Slate 800 background transition

### Cards & Surfaces
**Standard Card**
- Background: White with border Slate 200
- Border-radius: 12px
- Padding: p-6
- Shadow: `0 1px 3px rgba(0,0,0,0.06)`
- Hover: Lift with `0 4px 12px rgba(0,0,0,0.08)` transition

**Metric Card**
- Include large number (Display 36px JetBrains Mono)
- Small label above (12px uppercase Slate 500)
- Trend indicator: Arrow icon + percentage (Growth Green/Red)
- Mini sparkline chart below (optional)

**Glass Card (Overlays)**
- Background: `rgba(255,255,255,0.9)` with backdrop-blur-xl
- Border: 1px solid `rgba(255,255,255,0.2)`
- Dark mode: `rgba(15,23,42,0.9)`

### Buttons
**Primary Button**
- Background: Wealth Gradient
- Text: White, Inter SemiBold 15px
- Padding: px-6 py-3
- Border-radius: 8px
- Hover: Brightness increase, scale-105
- Active: Scale-95

**Secondary Button**
- Border: 2px Intelligence Blue
- Text: Intelligence Blue Inter SemiBold
- Background: Transparent
- Hover: Intelligence Blue background with opacity-10

**Icon Button**
- Size: 40px circle
- Background: Slate 100
- Icon: 20px Slate 600
- Hover: Slate 200 background

### Data Visualization
**Chart Style**
- Custom gradients under area charts (Growth Green to transparent)
- Smooth curves, no harsh angles
- Grid lines: Slate 200, minimal and subtle
- Tooltips: Glass card style with large number and context
- Interactive hover states with scale-105 on data points
- Color coding: Green (growth), Blue (projections), Amber (caution zones)

**Progress Indicators**
- Circular progress: Gradient stroke, 8px width
- Linear progress: Height 8px, rounded-full, gradient fill
- Percentage: 24px JetBrains Mono inside/beside

### Forms & Inputs
**Text Input**
- Height: 44px
- Border: 2px Slate 300, rounded-lg
- Focus: Intelligence Blue border, subtle glow
- Label: 14px Inter Medium, mb-2
- Error state: Red border with error message below (14px)

**Select Dropdown**
- Same styling as text input
- Chevron icon right-aligned
- Dropdown: White background, shadow-xl, max-h-64 overflow-auto

**Toggle/Switch**
- Width: 44px, Height: 24px
- Background: Slate 300 (off), Growth Green (on)
- Smooth transition, circle indicator

### Modals & Overlays
**Modal**
- Backdrop: `rgba(0,0,0,0.5)` backdrop-blur-sm
- Content: Glass card, max-w-2xl centered
- Header: 24px H3, close button top-right
- Footer: Buttons right-aligned with gap-3

**Notification Toast**
- Position: Top-right, stack vertically
- Glass card style, px-6 py-4
- Icon left (success/warning), message, close button
- Auto-dismiss after 5s with slide-out animation

---

## Micro-Animations

- **Page Transitions:** Fade-in with slide-up (0.3s ease-out)
- **Card Hover:** Scale-105, shadow increase (0.2s)
- **Button Press:** Scale-95 active state (0.1s)
- **Number Count-Up:** Animate from 0 to value on load (1.5s)
- **Chart Rendering:** Animate paths drawing in (1s stagger)
- **Loading States:** Skeleton screens with shimmer gradient

---

## Dark Mode

**Automatic toggle** in user preferences

- **Backgrounds:** Slate 900 (primary), Slate 800 (cards)
- **Text:** Slate 100 (primary), Slate 400 (secondary)
- **Borders:** Slate 700
- **Shadows:** Reduced opacity, subtle glows instead
- **Charts:** Maintain color vibrancy with adjusted opacity

---

## Key Screens & Layouts

### Advisor Dashboard
- **Hero Section:** Full-width stats bar with 4 metric cards (AUM, Active Clients, Pending Actions, Portfolio Performance)
- **Action Feed:** Left column (2/3 width) with AI-prioritized tasks, recent client activity
- **Quick Access:** Right sidebar (1/3 width) with upcoming meetings, notifications, quick actions
- **Charts:** Portfolio performance area chart, client health score donut charts

### Client 360° Profile
- **Header:** Large client name, avatar, quick stats (net worth, goals, risk score)
- **Tabs:** Overview, Financial Plan, Documents, Communication, Settings
- **Timeline:** Visual journey of relationship with milestones
- **Goal Cards:** Grid of goals with progress circles and target dates

### Planning Studio
- **Canvas Mode:** Center workspace for drag-drop scenario building
- **Left Panel:** Input fields for assumptions, goals, assets
- **Right Panel:** AI assistant with suggestions and insights
- **Bottom:** Timeline slider showing plan progression over years
- **Visualization:** Large interactive chart showing cash flow, net worth projections

### Client Portal (Mobile-First)
- **Dashboard:** Single column with net worth chart, goal progress cards, action items
- **Bottom Navigation:** 5 icons (Dashboard, Plan, Scenarios, Documents, Messages)
- **Hero Card:** One-page plan summary with key metrics
- **Swipeable Charts:** Horizontal scroll through different visualizations

---

## Images

**Hero Section (Advisor Landing Page)**
- Large professional image (1920x1080) showing advisor-client meeting or modern office
- Overlay: Wealth Gradient with 60% opacity
- Centered text with Display typography and primary CTA buttons with blurred backgrounds

**Empty States**
- Friendly illustrations (not photos) for "No clients yet," "No documents," etc.
- Soft colors matching brand palette
- Encouraging micro-copy with clear CTA

**Client Portal Background**
- Subtle abstract gradient pattern (Navy to Blue) as fixed background
- Low opacity to avoid interfering with content