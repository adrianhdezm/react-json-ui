import { UITextField } from './components/controls/ui-text-field';
import { UIBooleanField } from './components/controls/ui-boolean-field';
import { UIDateTimeField } from './components/controls/ui-date-field';
import { UIRadioGroupField } from './components/controls/ui-radio-group-field';
import { UISelectField } from './components/controls/ui-select-field';
import { UIFileField } from './components/controls/ui-file-field';
import { UIIcon } from './components/basics/ui-icon';
import { UIText } from './components/basics/ui-text';
import { UIButton } from './components/basics/ui-button';
import { UIBox } from './components/containers/ui-box';
import { UIPanel } from './components/containers/ui-panel';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UIControlRegistry: Record<string, React.FC<any>> = {
  UITextField: UITextField,
  UIBooleanField: UIBooleanField,
  UIDateTimeField: UIDateTimeField,
  UIRadioGroupField: UIRadioGroupField,
  UISelectField: UISelectField,
  UIFileField: UIFileField
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UIBasicRegistry: Record<string, React.FC<any>> = {
  UIIcon: UIIcon,
  UIText: UIText,
  UIButton: UIButton
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UIContainerRegistry: Record<string, React.FC<any>> = {
  UIBox: UIBox,
  UIPanel: UIPanel
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UIElementRegistry: Record<string, React.FC<any>> = {
  ...UIControlRegistry,
  ...UIBasicRegistry,
  ...UIContainerRegistry
};
