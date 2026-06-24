import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
// cant use SiGithub from "react-icons/si" directly because email clients strip down svgs
const githubIcon = (
  <img
    src="https://cdn.simpleicons.org/github/6b7280"
    alt=""
    width="16"
    height="16"
    style={{ verticalAlign: "middle", marginRight: "4px" }}
  />
);

export function emailTemplate(magicLink: string) {
  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "40px 20px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: "560px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e5e5",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "40px 32px" }}>
          <h1
            style={{
              margin: 0,
              color: "#111827",
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            Verify your email
          </h1>

          <p
            style={{
              color: "#4b5563",
              fontSize: "15px",
              lineHeight: 1.7,
              marginTop: "16px",
            }}
          >
            Click the button below to securely login and verify your email. No
            passwords needed. Once this is done, you will be required to link
            your Discord account for verification.
          </p>

          <div style={{ marginTop: "32px", textAlign: "center" }}>
            <a
              href={magicLink}
              style={{
                display: "inline-block",
                backgroundColor: "#111827",
                color: "#ffffff",
                textDecoration: "none",
                padding: "14px 28px",
                borderRadius: "10px",
                fontWeight: 600,
                fontSize: "15px",
              }}
            >
              Verify Email
            </a>
          </div>

          <div
            style={{
              marginTop: "32px",
              padding: "16px",
              backgroundColor: "#fafafa",
              border: "1px solid #e5e5e5",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                color: "#6b7280",
                fontSize: "13px",
                marginBottom: "8px",
              }}
            >
              Button not working? Copy and paste this link:
            </div>

            <div
              style={{
                fontSize: "13px",
                color: "#111827",
                wordBreak: "break-all",
                lineHeight: 1.6,
              }}
            >
              {magicLink}
            </div>
          </div>

          <p
            style={{
              color: "#9ca3af",
              fontSize: "13px",
              marginTop: "24px",
              lineHeight: 1.6,
            }}
          >
            This link is unique to you and may expire after a short period. If
            you didn't request this email, you can safely ignore it.
          </p>

          <div
            style={{
              marginTop: "32px",
              paddingTop: "24px",
              borderTop: "1px solid #e5e5e5",
              textAlign: "center",
              color: "#9ca3af",
              fontSize: "13px",
              lineHeight: 1.8,
            }}
          >
            <div style={{ marginTop: "8px" }}>
              <a
                href="https://github.com/cdhananjay/email-verifier"
                style={{
                  color: "#6b7280",
                }}
              >
                {githubIcon}
                Discord Bot
              </a>
              {" • "}
              <a
                href="https://github.com/cdhananjay/email-verifier-website"
                style={{
                  color: "#6b7280",
                }}
              >
                {githubIcon}
                Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { resend };
