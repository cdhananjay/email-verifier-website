import { CodeXml } from "lucide-react";
import { SiGit, SiGithub } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-6 px-4 py-8">
        <a
          href="https://github.com/cdhananjay/email-verifier"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <SiGithub className="size-4" />
          Discord Bot
        </a>
        <a
          href="https://github.com/cdhananjay/email-verifier-website"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >  
          <SiGithub className="size-4" />
          Website 
        </a>
      </div>
    </footer>
  );
}
