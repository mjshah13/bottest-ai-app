import { authMiddleware } from "@clerk/nextjs";
import { PageConfig } from "./Utils/Interface";

// import { PageConfig } from "./utils/Interface";

// Your middleware configuration remains the same
export default authMiddleware({
  publicRoutes: ["/" ],
  
});

export const config: PageConfig= {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
