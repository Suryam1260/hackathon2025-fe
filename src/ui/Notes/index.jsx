import React from 'react'

import showdown from 'showdown';
import showdownKatex from 'showdown-katex';


const converter = new showdown.Converter({
  openLinksInNewWindow: true,
  extensions: [
    showdownKatex({
      delimiters: [{ left: '@$@', right: '@$@' }, { left: '$', right: '$' }],
      output: 'html',
    }),
  ],
});

import {
  useSelector,
} from 'react-redux'

const Notes = () => {
  const selectedNode = useSelector((state) => state.roadmap?.selectedNode);
  console.log('selectedNode', selectedNode);

  const parsedString = () => {
    const html = converter.makeHtml(selectedNode?.data?.lectures || '');
    console.log('Rendered notes HTML:', html);
    return { __html: html };
  }
  return (
    <div className="p-4 notes-content">
      <div dangerouslySetInnerHTML={parsedString()} />
    </div>
  )
}

export default Notes;