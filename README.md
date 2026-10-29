# BEMCO Aluminium & Glass

## Continue building

Open your project in the and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Install [Bun](https://bun.sh/) to work locally.

```sh
bun install --frozen-lockfile
bun run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Deploy to Vercel

Import this GitHub repository in Vercel with the repository root as the project root. Use
`bun install --frozen-lockfile` as the install command and `bun run build` as the build command.
Leave the output directory unset: Nitro selects its Vercel preset from Vercel's build environment
and generates the deployment package in `.vercel/output`, including the Node.js serverless function
and static assets. Other environments continue to use the Cloudflare preset.

To verify the Vercel deployment package locally in PowerShell, run:

```powershell
$env:VERCEL = "1"
bun run build
Remove-Item Env:\VERCEL
```

Configure the required production environment variables listed below in Vercel's project settings
for every environment that should send enquiries. The site can build without these secrets, but
contact and quotation submissions will report that the enquiry service is not configured until
they are added.

## Enquiry form setup

The contact and quotation forms submit through a TanStack Start server function. Email delivery
uses the Resend API; duplicate submissions are reserved for two minutes in Upstash Redis. Set the
following variables in the server environment (and in a local, untracked `.env` file for
development):

| Variable                   | Required | Description                                                                                         |
| -------------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`           | Yes      | Secret Resend API key. Keep it server-side.                                                         |
| `RESEND_FROM_EMAIL`        | Yes      | Sender address on a domain verified with Resend, for example `BEMCO Website <website@example.com>`. |
| `UPSTASH_REDIS_REST_URL`   | Yes      | Upstash Redis REST endpoint used for duplicate-submit protection.                                   |
| `UPSTASH_REDIS_REST_TOKEN` | Yes      | Secret Upstash Redis REST token. Keep it server-side.                                               |
| `ENQUIRY_TO_EMAIL`         | No       | Recipient address; defaults to `info@bemcoalu.com`.                                                 |

Create the Resend and Upstash resources, verify the sending domain with Resend, and configure the
variables in the deployment provider before enabling production enquiries. The forms use server
validation, a honeypot field, a two-minute Redis reservation per normalized email address, and
disabled submit controls while a request is in flight. A success message is shown only after Resend
accepts the email. No enquiry database or file-attachment handling is configured.

## Company profile PDF

The BEMCO company profile PDF is available at `src/assets/BEMCO Profile (1).pdf` and is imported as
a static asset. The profile buttons download it as `BEMCO-Company-Profile.pdf`.
