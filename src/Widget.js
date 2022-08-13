import React, { useEffect, useState } from "react";
import styled from "styled-components";
import widgetSDK from "@happeo/widget-sdk";

import { LinkExternal } from "@happeouikit/form-elements";
import { margin200, padding300 } from "@happeouikit/layout";
import { navy, gray09 } from "@happeouikit/colors";
import { TextDelta, BodyUI } from "@happeouikit/typography";
import { useGetQuotes } from "./useGetQuotes";
import { WidgetSettings } from "./constants";

const Widget = ({ id /*editMode*/ }) => {
  const [, /*widgetApi*/ setWidgetApi] = useState();
  const [user, setUser] = useState();
  const [apiKey, setApiKey] = useState();
  const [apiHost, setApiHost] = useState();
  const quote = useGetQuotes(apiHost, apiKey);
  const [globalStyles, setGlobalStyles] = useState();
  const [fontSize, setFontSize] = useState();
  const [isBold, setIsBold] = useState();

  useEffect(() => {
    const doInit = async () => {
      // Init API
      const widgetApi = await widgetSDK.api.init(id);
      const context = await widgetApi.getContext();
      setGlobalStyles(context?.styles);
      widgetApi.declareSettings(WidgetSettings, updateStateFromSettings);
      const savedSettings = await widgetApi.getSettings();
      updateStateFromSettings(savedSettings);

      // Do stuff
      const user = await widgetApi.getCurrentUser();
      setWidgetApi(widgetApi);
      setUser(user);
    };
    doInit();
  }, [id]);

  const updateStateFromSettings = (currentSettings) => {
    const { apiKey, apiHost, fontSize, isBold } = currentSettings;
    if (apiKey && apiHost) {
      setApiHost(apiHost);
      setApiKey(apiKey);
    }
    setFontSize(fontSize);
    setIsBold(isBold);
  };

  return (
    <Container styles={{ ...globalStyles, fontSize, isBold }}>
      <BodyUI>{quote}</BodyUI>
    </Container>
  );
};

const Container = styled.div`
  padding: ${padding300};
  border-width: ${({ styles }) =>
    styles?.["border-width"] ? styles?.["border-width"] : "unset"};
  border-color: ${({ styles }) =>
    styles?.["border-color"] ? styles?.["border-color"] : "unset"};
  p {
    font-size: ${({ styles }) =>
      styles?.fontSize ? `${styles.fontSize}px !important` : "unset"};
    font-weight: ${({ styles }) =>
      styles?.isBold === "TRUE" ? "bold !important" : "unset"};
    line-height: 1.5;
  }

  * {
    color: ${({ styles }) => (styles?.color ? styles.color : "unset")};
  }
  a {
    color: ${({ styles }) =>
      styles?.["link-color"] ? styles?.["link-color"] : "unset"} !important;
  }
`;
const StyledUl = styled.ul`
  list-style: disc;
  padding: ${padding300};
`;

export default Widget;
