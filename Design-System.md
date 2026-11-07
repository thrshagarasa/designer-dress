# Phase 3 UI Design System

Designer Boutique — Admin and Customer Portal

## 1. Colors

| Role | Color value | Usage | Source / note |
| --- | --- | --- | --- |
| Primary charcoal | `#333333` | Main welcome heading and primary action buttons | Explicit hex value |
| Primary hover / deep | `#000000` | Button hover state and strong emphasis | Tailwind black |
| Page background | `#FFFFFF` | Main page and card surfaces | White utility / CSS default |
| Soft background | `#F9FAFB` | Subtle page sections and table backgrounds | Tailwind gray-50 |
| Secondary surface | `#F3F4F6` | Muted panels and input backgrounds | Tailwind gray-100 |
| Border | `#D1D5DB` | Input outlines and separators | Tailwind gray-300 |
| Primary text | `#1F2937` | Main body text | Tailwind gray-800 |
| Secondary text | `#6B7280` | Labels, helper text and metadata | Tailwind gray-500 |
| Success | `#DCFCE7` / `#166534` | Completed and positive states | Tailwind green-100 / green-800 |
| Warning / pending | `#FEF3C7` / `#92400E` | Pending and attention states | Tailwind yellow-100 / yellow-800 |
| Information / progress | `#DBEAFE` / `#1E40AF` | In-progress and informational states | Tailwind blue-100 / blue-800 |
| Error / issue | `#FEF2F2` / `#B91C1C` | Error and issue messaging | Tailwind red-50 / red-700 |

## 2. Typography

| Text style | Observed size / weight | Typical use |
| --- | --- | --- |
| Display heading | `text-4xl` to `text-5xl`; semibold / italic | Welcome screen title |
| Page heading | `text-2xl` to `text-3xl`; generally bold / semibold | Dashboard and form titles |
| Section heading | `text-lg` to `text-xl`; medium / semibold | Cards and content sections |
| Body / controls | `text-sm` (14px) commonly used | Buttons, form labels, table content |
| Compact metadata | `text-xs` (12px) | Dates, helper text, badges and secondary details |
| Default body | `text-base` (16px) | Longer content and standard text |

## 3. UI Components

- **Navigation and page layout:** Welcome screen role selection; admin portal navigation; customer portal back/home navigation.
- **Buttons:** Rounded primary charcoal buttons, white text, hover darkening and slight scale transition on welcome actions.
- **Cards and panels:** White or light-gray content surfaces with spacing, borders and rounded corners for dashboard summaries and forms.
- **Forms and inputs:** Text, date and selection fields used for customer details, measurements, dress specifications, order lookup, alteration requests and feedback.
- **Order tables / lists:** Order listing with customer/order details and status information.
- **Status badges:** Distinct semantic colors for Pending, In Progress, Completed, Submitted, Reviewed and Resolved states.
- **Dashboard summary cards:** Metric and overview cards for order and service activity.
- **Feedback controls:** Customer rating and comments submission area.
- **Alteration request panel:** Issue type, description and preferred date inputs linked to a customer order.
- **Order tracking view:** Displays a selected order and its current progress note/status.
- **Images / branding:** Boutique logo image displayed prominently on the welcome screen.
