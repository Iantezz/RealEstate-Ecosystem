import { Menu } from 'n';
import { FunctionComponent } from "react";
import Link from "next/link";

type WalletBarProps = {
  isLoading: boolean;
  isInstalled: boolean;
  account: string | undefined;
  connect: () => void;
};

const WalletBar: FunctionComponent<WalletBarProps> = ({
  isInstalled,
  isLoading,
  account,
  connect,
}) => {
  // loading
  if (isLoading) {
    return (
      <div>
        <button
          onClick={() => {}}
          type="button"
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium"
        ></button>
      </div>
    );
  }

  // account
  if (account) {
    return (
      <Menu as="div" className="ml-3 relative">
        <div>
          <Menu.Button className="inline-flex items-center px-4 py-2 border border-transparent text-ba">
            Open user menu
          </Menu.Button>
        </div>

        <Menu.Items>
          <Menu.Item>
            <button>
              {`0x${account[2]}${account[3]}${account[4]}....${account.slice(-4)}`}
            </button>
          </Menu.Item>
          <Menu.Item>
            <a>profile</a>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    );
  }

  // installed
  if (isInstalled) {
    return (
      <div>
        <button>Connect wallet</button>
      </div>
    );
  } else {
    return (
      <div>
        <button
          onClick={() => {
            window.open('https://metamask.io', '_blank');
          }}
        >
          Install wallet
        </button>
      </div>
    );
  }
};

export default WalletBar;
