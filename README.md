## React Tooltipy

Pure react implementation for a simple fully customizable tooltip with edge detecting.

### Usage

```javascript
import { Tooltippy } from 'Tooltippy';
```

```javascript
const tooltip = (
  <div>
    <span>Some content for the tooltip</span>
  </div>
);

<Tooltippy
  className='any_container'
  classNameTooltip='hover_tooltip'
  tooltipContent={tooltip}
>
  <span>Here you can add any HTML tag you want</span>
</Tooltippy>;
```

### Properties

| Markdown           | Less                                                               |
| ------------------ | ------------------------------------------------------------------ |
| `className`        | Default class for the hoverable div                                |
| `classNameTooltip` | Default class for the tooltip                                      |
| `tooltipContent`   | Tooltip content, your HTML mark-up                                 |
| `onClick`          | If you need your hoverable to be clicked you can use this function |
| `padding`          | Padding for the tooltip positioning away from the mouse            |
