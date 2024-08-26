"use client";

import { useMantineTheme, rem, Switch, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

const ThemeSwitch = () => {
  const theme = useMantineTheme();
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  const sunIcon = <IconSun style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.yellow[4]} />;
  const moonIcon = (
    <IconMoonStars style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.blue[6]} />
  );

  function handleSwitch() {
    toggleColorScheme();
  }

  return (
    <Switch
      size="md"
      color="dark.4"
      onLabel={sunIcon}
      offLabel={moonIcon}
      checked={colorScheme === "dark"}
      onChange={handleSwitch}
    />
  );
};

export default ThemeSwitch;
