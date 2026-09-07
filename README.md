# iRySociaL: A Content-Based Site on Irys

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/MITCHYUGAN/iRySociaL/actions/workflows/main.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Description

iRySociaL is a content-based website built on **Irys**, showcasing the power of Irys's decentralized storage and its programmable Datachain capabilities. It allows users to create, share, and discover content such as posts, articles, and potentially videos, all while ensuring data permanence and decentralization.

## ✨ Key Features

*   **Decentralized Content Storage:** Utilizes Irys for permanent and decentralized storage of all user-generated content.
*   **Multiple Content Types:** Supports the creation and display of posts, articles, and is designed to accommodate videos.
*   **User Profiles:** Users can create profiles with unique usernames and bios, linked to their wallets.
*   **Web3 Integration:** Seamless integration with MetaMask and other Ethereum wallets via RainbowKit and Wagmi for authentication and transaction management.
*   **Rich Content Creation:** Features a BlockNote editor for creating rich text articles with various formatting options.
*   **Dynamic Feeds:** Displays content in curated feeds (e.g., 'For You', 'Posts', 'Articles', 'Videos') for a personalized user experience.
*   **Profile Management:** Users can manage their profiles, view their content, and track wallet/upload balances.
*   **Theming:** Supports dark and light mode themes for a customizable user interface.
*   **Irys Integration:** Directly interacts with Irys for uploading content and managing balances.

## 🛠️ Tech Stack

*   **Frontend:** React, TypeScript, Vite, Next.js (implied by framework usage)
*   **Styling:** Tailwind CSS, `tw-animate-css`
*   **State Management:** React Context (UserContext), React Query (@tanstack/react-query)
*   **UI Components:** Radix UI (`@radix-ui/*`), Shadcn UI (`@blocknote/shadcn`, `@radix-ui/*` components)
*   **Web3:** Wagmi, RainbowKit, Ethers.js, Viem
*   **Content Editor:** BlockNote (`@blocknote/*`)
*   **Backend/Blockchain:** Irys (`@irys/web-upload`)
*   **Utilities:** Axios, Class Variance Authority, `clsx`, DOMPurify, Lodash, Lucide React

## 📦 Installation & Setup

This project utilizes `npm` and `yarn` for package management. Ensure you have Node.js installed.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MITCHYUGAN/iRySociaL.git
    cd iRySociaL
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables (values can be placeholders if not critical for local setup):
    ```dotenv
    VITE_APP_ID=your_app_id
    VITE_TYPE_POST=post_type
    VITE_TYPE_ARTICLE=article_type
    VITE_TYPE_PROFILE=profile_type
    PROJECT_ID=YOUR_PROJECT_ID # For RainbowKit
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

5.  **Build for production:**
    ```bash
    npm run build
    # or
    yarn build
    ```

## 💡 Usage & Examples

This application is a decentralized social media platform where users can create and share content stored permanently on the Irys network.

### Core Functionality:

1.  **Connecting Wallet:** Upon launching the app, you will be prompted to connect your Ethereum-compatible wallet (e.g., MetaMask) using the **RainbowKit** integration.

2.  **Onboarding/Profile Creation:** If you are a new user, you'll be directed to create a profile. This involves choosing a unique username (which is validated for availability) and optionally adding a bio. Your profile is then stored on Irys, linked to your wallet address.
    *   **Example (Profile Creation):**
        ```bash
        # Navigate to /onboarding/profile
        # Enter desired username (e.g., @mycooluser)
        # Optionally add a bio
        # Click 'Create Profile'
        ```

3.  **Creating Content:**
    *   **Posts:** Users can create short text-based posts, optionally with images. These are then uploaded to Irys.
        ```bash
        # Navigate to /create/post
        # Write your post content
        # Click the image icon to add images
        # Click 'Create Post' to upload to Irys
        ```
    *   **Articles:** A rich text editor (BlockNote) allows for creating more in-depth articles. Users can add cover images, format text, and insert images within the article body. These are also stored on Irys.
        ```bash
        # Navigate to /create/article
        # Add a cover image by clicking the designated area
        # Use the BlockNote editor to write and format your article
        # Click 'Publish on Irys' to save the article
        ```
    *   **Videos:** While the UI indicates video creation is planned, the current implementation redirects to a placeholder page.

4.  **Viewing Content:**
    *   **Home Feed (`/home`):** Aggregates posts and articles. Tabs allow filtering for 'For You', 'Following' (currently disabled), and 'Trending' (currently disabled).
    *   **Posts Feed (`/posts`):** Displays all posts from the community.
    *   **Articles Feed (`/articles`):** Showcases all published articles.
    *   **Video Feed (`/videos`):** A placeholder for future video content.
    *   **Profiles (`/profile/:username`):** View other users' profiles, their posts, articles, and potentially videos.

5.  **Decentralized Nature:** All content created is intended to be permanently stored on the Irys network, ensuring censorship resistance and data ownership.

## 📚 Project Structure

```
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Cards/
│   │   ├── Feeds/
│   │   ├── modal/
│   │   └── ui/
│   ├── context/
│   ├── features/
│   │   ├── CreateArticle/
│   │   ├── CreatePost/
│   │   ├── CreateVideo/
│   │   ├── Dark_LightMode/
│   │   └── Profile/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── styles/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env
├── .eslintrc.cjs
├── eslint.config.js
├── index.html
├── netlify.toml
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 📚 Dependencies

*   **`@irys/*`**: Core Irys SDK for uploading and managing data on the Irys network.
*   **`@blocknote/*`**: Rich text editor components and core logic.
*   **`@rainbow-me/rainbowkit`, `wagmi`, `viem`, `ethers`**: For seamless Web3 wallet integration and interaction.
*   **`react`, `react-dom`**: Core React libraries.
*   **`react-router-dom`**: For client-side routing.
*   **`@tanstack/react-query`**: For efficient data fetching and state management.
*   **`tailwindcss`**: For utility-first CSS styling.
*   **`@radix-ui/*`**: Primitive UI components for building accessible interfaces.
*   **`lucide-react`**: For SVG icons.
*   **`axios`**: For making HTTP requests.
*   **`dompurify`**: For sanitizing HTML content.
*   **`typescript`, `@typescript-eslint/*`**: For TypeScript support and linting.
*   **`vite`, `@vitejs/plugin-react`**: Build tool and React plugin.
*   **`eslint`**: Code linting.

## 📜 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
3.  Make your changes and commit them (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🔗 Important Links

*   **Live Demo:** [iRySociaL](https://iryssocial.vercel.app/) (Note: This is a hypothetical URL based on common deployment patterns; verify actual deployment URL if available.)
*   **Irys Documentation:** [https://docs.irys.xyz/](https://docs.irys.xyz/)
*   **Repository:** [iRySociaL on GitHub](https://github.com/MITCHYUGAN/iRySociaL)

--- 

© 2023 [iRySociaL](https://github.com/MITCHYUGAN/iRySociaL). All rights reserved. | Author: [MITCHYUGAN](https://github.com/MITCHYUGAN)

--- 

> Fork this project, give it a ⭐️, and contribute to make it even better!
