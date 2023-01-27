import * as React from "react";

import computeColumnsLayout from "../../layouts/columns";
import PhotoRenderer from "../renderers/PhotoRenderer";
import ColumnContainerRenderer from "../renderers/ColumnContainerRenderer";
import { ColumnsLayoutOptions, ComponentsProps, Photo, RenderColumnContainer, RenderPhoto } from "../../types";

type ColumnsLayoutProps<T extends Photo = Photo> = {
    photos: T[];
    layoutOptions: ColumnsLayoutOptions<T>;
    renderPhoto?: RenderPhoto<T>;
    renderColumnContainer?: RenderColumnContainer<T>;
    componentsProps?: ComponentsProps;
};

const ColumnsLayout = <T extends Photo = Photo>(props: ColumnsLayoutProps<T>) => {
    const { photos, layoutOptions, renderPhoto, renderColumnContainer, componentsProps } = props;

    const columnsLayout = computeColumnsLayout({ photos, layoutOptions });

    if (!columnsLayout) return null;

    const { columnsModel, columnsRatios, columnsGaps } = columnsLayout;

    return (
        <>
            {columnsModel.map((column, columnIndex) => (
                <ColumnContainerRenderer
                    // eslint-disable-next-line react/no-array-index-key
                    key={`column-${columnIndex}`}
                    layoutOptions={layoutOptions}
                    columnIndex={columnIndex}
                    columnsCount={columnsModel.length}
                    columnsGaps={columnsGaps}
                    columnsRatios={columnsRatios}
                    renderColumnContainer={renderColumnContainer}
                    columnContainerProps={componentsProps?.columnContainerProps}
                >
                    {column.map(({ photo, layout }) => (
                        <PhotoRenderer
                            key={photo.key || photo.src}
                            photo={photo}
                            layout={layout}
                            layoutOptions={layoutOptions}
                            renderPhoto={renderPhoto}
                            imageProps={componentsProps?.imageProps}
                        />
                    ))}
                </ColumnContainerRenderer>
            ))}
        </>
    );
};

export default ColumnsLayout;
