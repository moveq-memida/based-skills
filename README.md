# Based Skills

AI Agent Skill Marketplace on Base blockchain.

## Overview

Based Skills is a marketplace where creators can mint and sell AI agent skills as NFTs. Buyers can purchase skills to give their AI agents new abilities.

## Tech Stack

- **Frontend:** React Router v7 (Remix successor) + TypeScript
- **Styling:** CSS Modules (custom design)
- **Web3:** OnchainKit (Base official SDK)
- **Database:** Neon (PostgreSQL) + Prisma
- **Storage:** Irys (permanent skill file storage)
- **Hosting:** Cloudflare Pages

## Features

- [ ] Skill listing and browsing
- [ ] NFT minting on Base
- [ ] Skill file upload to Irys
- [ ] Creator royalties on resales
- [ ] Wallet authentication via OnchainKit
- [ ] Profile pages
- [ ] Search and filtering

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Type check
npm run typecheck

# Build for production
npm run build
```

## Environment Variables

```
DATABASE_URL=your_neon_connection_string
DIRECT_URL=your_neon_direct_connection_string
```

## License

ISC
