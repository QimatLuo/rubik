import "./style.css";
import { random } from "@rubik/core";

random().map(x => {
  const div = document.createElement('div')
  div.textContent = x
})

