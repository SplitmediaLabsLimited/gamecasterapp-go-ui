import React from 'react';
import { action } from '@storybook/addon-actions';
import { Zap } from '@styled-icons/octicons/Zap';
import { css as sx } from '@theme-ui/css';
import { IconButton, Button, Flex } from '@go-ui/components';

import {
  Delete,
  Save,
  CloudUpload,
  KeyboardVoice,
  Send,
} from '@styled-icons/material';

export default {
  title: 'Components/Button',
};

export const fill = () => (
  <>
    <Flex p={1}>
      <Button onClick={action('clicked')} mr="2">
        Default
      </Button>
      <Button color="primary.300" onClick={action('clicked')} mr="2">
        Primary
      </Button>
      <Button disabled onClick={action('clicked')} mr="2">
        Disabled
      </Button>
      <Button color="system.danger" onClick={action('clicked')} mr="2">
        Danger
      </Button>
      <Button color="white" onClick={action('clicked')} mr="2">
        White
      </Button>
    </Flex>

    <Flex p={1} sx={{ alignItems: 'center' }}>
      <Button
        color="system.danger"
        size="xsmall"
        onClick={action('clicked')}
        mr="2">
        xsmall
      </Button>
      <Button
        color="system.warning"
        size="small"
        onClick={action('clicked')}
        mr="2">
        small
      </Button>
      <Button color="system.success" onClick={action('clicked')} mr="2">
        default / medium
      </Button>
      <Button
        size="large"
        color="system.info"
        onClick={action('clicked')}
        mr="2">
        large
      </Button>
    </Flex>
  </>
);

export const fill_with_icon = () => (
  <Flex p={1} sx={{ alignItems: 'center' }}>
    <Button color="system.danger" onClick={action('clicked')} mr="2">
      <Delete css={sx({ mr: 2, ml: -1 })} /> DELETE
    </Button>
    <Button color="primary.300" onClick={action('clicked')} mr="2">
      SEND <Send css={sx({ mr: -1, ml: 2 })} />
    </Button>
    <Button color="white" onClick={action('clicked')} mr="2">
      <CloudUpload css={sx({ mr: 2, ml: -1 })} /> UPLOAD
    </Button>
    <Button disabled onClick={action('clicked')} mr="2">
      <KeyboardVoice css={sx({ mr: 2, ml: -1 })} /> TALK
    </Button>
    <Button color="base.600" onClick={action('clicked')} mr="2">
      <Save css={sx({ mr: 2, ml: -1 })} /> SAVE
    </Button>
  </Flex>
);

export const outline = () => (
  <>
    <Flex p={1}>
      <Button variant="outline" onClick={action('clicked')} mr="2">
        Default
      </Button>
      <Button
        variant="outline"
        color="primary.300"
        onClick={action('clicked')}
        mr="2">
        Primary
      </Button>
      <Button variant="outline" disabled onClick={action('clicked')} mr="2">
        Disabled
      </Button>
      <Button
        variant="outline"
        color="system.danger"
        onClick={action('clicked')}
        mr="2">
        Danger
      </Button>
      <Button
        variant="outline"
        color="white"
        onClick={action('clicked')}
        mr="2">
        White
      </Button>
    </Flex>

    <Flex p={1} sx={{ alignItems: 'center' }}>
      <Button
        variant="outline"
        color="system.danger"
        size="xsmall"
        onClick={action('clicked')}
        mr="2">
        xsmall
      </Button>
      <Button
        variant="outline"
        color="system.warning"
        size="small"
        onClick={action('clicked')}
        mr="2">
        small
      </Button>
      <Button
        variant="outline"
        color="system.success"
        onClick={action('clicked')}
        mr="2">
        default / medium
      </Button>
      <Button
        variant="outline"
        size="large"
        color="system.info"
        onClick={action('clicked')}
        mr="2">
        large
      </Button>
    </Flex>
  </>
);

export const transparent_background = () => (
  <>
    <Flex p={1}>
      <Button variant="transparent" onClick={action('clicked')} mr="2">
        Default
      </Button>
      <Button
        variant="transparent"
        color="primary.300"
        onClick={action('clicked')}
        mr="2">
        Primary
      </Button>
      <Button variant="transparent" disabled onClick={action('clicked')} mr="2">
        Disabled
      </Button>
      <Button
        variant="transparent"
        color="system.danger"
        onClick={action('clicked')}
        mr="2">
        Danger
      </Button>
      <Button
        variant="transparent"
        color="white"
        onClick={action('clicked')}
        mr="2">
        White
      </Button>
    </Flex>

    <Flex p={1} sx={{ alignItems: 'center' }}>
      <Button
        variant="transparent"
        color="system.danger"
        size="xsmall"
        onClick={action('clicked')}
        mr="2">
        xsmall
      </Button>
      <Button
        variant="transparent"
        color="system.warning"
        size="small"
        onClick={action('clicked')}
        mr="2">
        small
      </Button>
      <Button
        variant="transparent"
        color="system.success"
        onClick={action('clicked')}
        mr="2">
        default / medium
      </Button>
      <Button
        variant="transparent"
        color="system.info"
        onClick={action('clicked')}
        size="large"
        mr="2">
        large
      </Button>
    </Flex>
  </>
);

export const iconButton = () => (
  <>
    <Flex p={1}>
      <IconButton
        mr="2"
        variant="fill"
        color="primary.300"
        aria-label="Zap!!"
        onClick={action('clicked')}>
        <Zap />
      </IconButton>
      <IconButton
        mr="2"
        variant="fill"
        color="system.info"
        aria-label="Zap!!"
        onClick={action('clicked')}>
        <Zap />
      </IconButton>
      <IconButton
        mr="2"
        variant="fill"
        color="system.danger"
        aria-label="Zap!!"
        onClick={action('clicked')}>
        <Zap />
      </IconButton>
      <IconButton
        mr="2"
        variant="fill"
        color="system.warning"
        aria-label="Zap!!"
        onClick={action('clicked')}>
        <Zap />
      </IconButton>
    </Flex>
    <Flex p={1}>
      <IconButton
        mr="2"
        variant="rounded"
        color="primary.300"
        aria-label="Zap!!"
        onClick={action('clicked')}>
        <Zap />
      </IconButton>
      <IconButton
        mr="2"
        variant="rounded"
        color="system.info"
        aria-label="Zap!!"
        onClick={action('clicked')}>
        <Zap />
      </IconButton>
      <IconButton
        mr="2"
        variant="rounded"
        color="system.danger"
        aria-label="Zap!!"
        onClick={action('clicked')}>
        <Zap />
      </IconButton>
      <IconButton
        mr="2"
        variant="rounded"
        color="system.warning"
        aria-label="Zap!!"
        onClick={action('clicked')}>
        <Zap />
      </IconButton>
    </Flex>

    <Flex p={1}>
      <IconButton
        mr="2"
        variant="fillCircle"
        color="primary.300"
        aria-label="Zap!!"
        onClick={action('clicked')}>
        <Zap />
      </IconButton>
      <IconButton
        mr="2"
        variant="fillCircle"
        color="system.info"
        aria-label="Zap!!"
        onClick={action('clicked')}>
        <Zap />
      </IconButton>
      <IconButton
        mr="2"
        variant="fillCircle"
        color="system.danger"
        aria-label="Zap!!"
        onClick={action('clicked')}>
        <Zap />
      </IconButton>
      <IconButton
        mr="2"
        variant="fillCircle"
        color="system.warning"
        aria-label="Zap!!"
        onClick={action('clicked')}>
        <Zap />
      </IconButton>
    </Flex>

    <Flex p={1} sx={{ alignItems: 'center' }}>
      <IconButton
        mr="2"
        size="xsmall"
        color="primary.300"
        aria-label="Zap!!"
        onClick={action('clicked')}>
        <Zap />
      </IconButton>
      <IconButton
        mr="2"
        size="small"
        color="system.info"
        aria-label="Zap!!"
        onClick={action('clicked')}>
        <Zap />
      </IconButton>
      <IconButton
        mr="2"
        size="medium"
        color="system.danger"
        aria-label="Zap!!"
        onClick={action('clicked')}>
        <Zap />
      </IconButton>
      <IconButton
        mr="2"
        size="large"
        color="system.warning"
        aria-label="Zap!!"
        onClick={action('clicked')}>
        <Zap />
      </IconButton>
      <IconButton
        mr="2"
        size={32}
        color="orange"
        aria-label="Zap!!"
        onClick={action('clicked')}>
        <Zap />
      </IconButton>
      <IconButton
        mr="2"
        size={64}
        color="base.400"
        aria-label="Zap!!"
        onClick={action('clicked')}>
        <Zap />
      </IconButton>
      <IconButton
        mr="2"
        size={64}
        color="muted"
        aria-label="Zap!!"
        onClick={action('clicked')}>
        <Zap />
      </IconButton>
      <IconButton
        mr="2"
        size={148}
        color="white"
        aria-label="Zap!!"
        onClick={action('clicked')}>
        <Zap />
      </IconButton>
    </Flex>
  </>
);
