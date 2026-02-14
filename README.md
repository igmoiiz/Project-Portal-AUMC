# Air University Multan Campus - Project Ideas Portal

A professional web portal for browsing and managing project ideas across all Air University Multan Campus departments.

## Features

- **Browse Projects by Department**: Filter and view project ideas by Computer Science, Software Engineering, Information Technology, Electrical Engineering, and Business Administration
- **Interactive Project Table**: View supervisor names, interested areas, and project ideas with action buttons
- **Copy Functionality**: Quickly copy project ideas to clipboard
- **Validate Ideas**: Submit project ideas to ideacatalyst.app with pre-filled information
- **Faculty Upload**: Upload project ideas from Excel files
- **Professional Design**: Clean, academic-focused interface with vintage paper aesthetic

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- Access to the Faculty API (running on `http://localhost:5000/api/faculty`)

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
# or
pnpm install
```

2. Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

3. Configure the API endpoint in `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/faculty
```

4. Start the development server:

```bash
npm run dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Integration

### Endpoints Used

#### Get Projects by Department
```
GET /projects?department=<CS|SE|IT|EE|BBA>
Response: { success: boolean, data: ProjectIdea[] }
```

#### Upload Projects File
```
POST /upload
Headers: Authorization: Bearer <token>
Body: multipart/form-data with file (.xlsx)
Response: { success: boolean, message: string, count: number }
```

### Project Idea Structure

```typescript
interface ProjectIdea {
  id: string;
  supervisor: string;
  interested_area: string;
  project_idea: string;
  department: string;
}
```

## File Structure

```
app/
├── layout.tsx              # Root layout with metadata
├── page.tsx                # Home page with projects table
├── faculty/
│   └── page.tsx            # Faculty upload page
└── globals.css             # Global styles

components/
├── Header.tsx              # University header branding
├── DepartmentSelector.tsx  # Department dropdown
├── ProjectsTable.tsx       # Main projects table
├── ProjectRow.tsx          # Individual project row
├── CopyButton.tsx          # Copy-to-clipboard button
├── ValidateButton.tsx      # Redirect to ideacatalyst.app
└── UploadForm.tsx          # Excel file upload form

lib/
├── api.ts                  # API client functions
└── types.ts                # TypeScript interfaces
```

## Pages

### Home Page (`/`)
- Department selector with 5 departments
- Dynamic projects table that updates based on selection
- Loading states and error handling
- Empty state message when no department is selected

### Faculty Upload Page (`/faculty`)
- Excel file upload interface
- Upload progress indicator
- Success/error notifications
- Instructions and file format example

## Components

### DepartmentSelector
Dropdown component for selecting department (CS, SE, IT, EE, BBA)

### ProjectsTable
Main table component displaying projects with:
- Supervisor column
- Interested Area column
- Project Idea column (with truncation)
- Actions column with Copy and Validate buttons

### CopyButton
Copies project idea to clipboard with visual feedback

### ValidateButton
Opens ideacatalyst.app with pre-filled project details

### UploadForm
Faculty upload interface with:
- File input for .xlsx files
- Upload progress bar
- Success/error feedback
- Loading states

## Styling

The application uses a professional academic aesthetic with:
- **Color Palette**: Amber/brown tones (vintage paper theme)
- **Typography**: Serif for headings, sans-serif for body
- **Layout**: Flexbox-based responsive design
- **Spacing**: Consistent Tailwind spacing scale
- **Borders**: Subtle amber borders for card containers

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Faculty API base URL | Yes | `http://localhost:5000/api/faculty` |

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting (if configured)
npm run lint
```

## API Error Handling

The application gracefully handles:
- Network errors
- Invalid responses
- Missing data
- File upload failures

Errors are displayed to the user with clear messages and recovery options.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- The application fetches projects on-demand when a department is selected
- Copy button provides visual feedback (2-second confirmation)
- Upload progress simulates realistic upload speeds
- All data is fetched from the backend API (no local storage)
- Faculty authentication is handled via Bearer token in headers

## Future Enhancements

- Faculty authentication/login page
- Department management interface
- Project filtering and search
- Advanced sorting options
- CSV export functionality
- Bulk project operations
- Analytics dashboard

## Support

For issues or questions, please contact the development team.

---

Built with ❤️ for Air University Multan Campus
