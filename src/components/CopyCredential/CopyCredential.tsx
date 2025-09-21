import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyCredentialProps {
  label: string;
  value: string;
}

const CopyCredential: React.FC<CopyCredentialProps> = ({ label, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // revert icon after 2s
  };

  return (
    <div className="flex items-center justify-between bg-background/50 backdrop-blur-sm border border-border rounded-md px-3 py-2 mb-2">
      <div className="text-sm font-medium text-foreground">{label}</div>
      <button
        onClick={handleCopy}
        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
};

export default CopyCredential;
