import TabBarText from '@/components/TabBarText';
import AccountIcon from '@/components/tabIcons/AccountIcon';
import CheckIcon from '@/components/tabIcons/CheckIcon';
import HomeIcon from '@/components/tabIcons/HomeIcon';

export const renderTabBarIcon = ({ focused }: { focused: boolean }) => (
  <HomeIcon focused={focused} />
);
export const renderTabBarLabel = ({ focused }: { focused: boolean }) => (
  <TabBarText focused={focused} text="Home" />
);

export const renderTabBarIconBook = ({ focused }: { focused: boolean }) => (
  <CheckIcon focused={focused} />
);
export const renderTabBarLabelBook = ({ focused }: { focused: boolean }) => (
  <TabBarText focused={focused} text="Find and Book" />
);

export const renderTabBarIconProfile = ({ focused }: { focused: boolean }) => (
  <AccountIcon focused={focused} />
);
export const renderTabBarLabelProfile = ({ focused }: { focused: boolean }) => (
  <TabBarText focused={focused} text="Account" />
);
