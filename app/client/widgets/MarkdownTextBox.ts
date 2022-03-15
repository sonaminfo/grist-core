import {DataRowModel} from 'app/client/models/DataRowModel';
import {ViewFieldRec} from 'app/client/models/entities/ViewFieldRec';
import {colors} from 'app/client/ui2018/cssVars';
import {NTextBox} from 'app/client/widgets/NTextBox';
import {dom, styled} from 'grainjs';

/**
 * Creates a widget for displaying links.  Links can entered directly or following a title.
 * The last entry following a space is used as the url.
 * ie 'google https://www.google.com' would apears as 'google' to the user but link to the url.
 */
export class MarkdownTextBox extends NTextBox {
  constructor(field: ViewFieldRec) {
    super(field, {defaultTextColor: colors.lightGreen.value});
  }

  public buildDom(row: DataRowModel) {
    const value = row.cells[this.field.colId()];
    return cssMarkdownField(
      dom.style('text-align', this.alignment),
      dom.cls('text_wrapping', this.wrapping),
      dom.prop('innerHTML', (use) =>
        (window as any).DOMPurify.sanitize((window as any).marked(use(value)))
      ),
    );
  }
}

const cssMarkdownField = styled('div.field_clip', `
  white-space: normal;
  word-break: break-word;
  line-height: 1.4;
  & p:last-child {
    margin-bottom: 0px;
  }
  & ul, & ol {
    padding-left: 16px;
  }
  & li {
  }
`);
