import {
    LoadingThumbnail,
    StaticThumbnail,
} from "@/new/photos/components/PlaceholderThumbnails";
import downloadManager from "@/new/photos/services/download";
import { type EnteFile } from "@/new/photos/types/file";
import { styled } from "@mui/material";
import React, { useEffect, useState } from "react";

interface ItemCardProps {
    /**
     * One of the *Tile components to use as the top level element.
     */
    TileComponent: React.FC<React.PropsWithChildren>;
    /**
     * Optional file whose thumbnail (if any) should be should be shown.
     */
    coverFile?: EnteFile | undefined;
    /**
     * Optional boolean indicating if the user is currently scrolling.
     *
     * This is used as a hint by the cover file downloader to prioritize
     * downloads.
     */
    isScrolling?: boolean;
    /**
     * Optional click handler.
     */
    onClick?: () => void;
}
/**
 * A generic card that can be be used to represent collections, files, people -
 * anything that (usually) has an associated "cover photo".
 */
export const ItemCard: React.FC<React.PropsWithChildren<ItemCardProps>> = ({
    TileComponent,
    coverFile,
    isScrolling,
    onClick,
    children,
}) => {
    const [coverImageURL, setCoverImageURL] = useState("");

    useEffect(() => {
        if (!coverFile) return;
        void downloadManager
            .getThumbnailForPreview(coverFile, isScrolling)
            .then((url) => url && setCoverImageURL(url));
    }, [coverFile, isScrolling]);

    return (
        <TileComponent {...{ onClick }}>
            {coverFile?.metadata.hasStaticThumbnail ? (
                <StaticThumbnail fileType={coverFile.metadata.fileType} />
            ) : coverImageURL ? (
                <img src={coverImageURL} />
            ) : (
                <LoadingThumbnail />
            )}
            {children}
        </TileComponent>
    );
};

/**
 * A generic "base" tile, meant to be used (after setting dimensions) as the
 * {@link TileComponent} provided to an {@link ItemCard}.
 *
 * Use {@link ItemTileOverlay} (usually via one of its presets) to overlay
 * content on top of the tile.
 */
export const ItemTile = styled("div")`
    display: flex;
    /* Act as container for the absolutely positioned ItemTileOverlays. */
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    & > img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
    user-select: none;
`;

/**
 * A 48x48 TileComponent used in search result dropdown's preview files and
 * other places.
 */
export const PreviewItemTile = styled(ItemTile)`
    width: 48px;
    height: 48px;
`;

/**
 * A rectangular, TV-ish tile used in the gallery bar.
 */
export const BarItemTile = styled(ItemTile)`
    width: 90px;
    height: 64px;
`;

/**
 * A large 150x150 TileComponent used when showing the list of all collections
 * in the all collections view.
 */
export const AllCollectionTile = styled(ItemTile)`
    width: 150px;
    height: 150px;
`;

/**
 * An empty overlay on top of the nearest relative positioned ancestor.
 *
 * This is meant to be used in tandem with {@link ItemTile}.
 */
export const ItemTileOverlay = styled("div")`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;

/**
 * An {@link ItemTileOverlay} suitable for hosting textual content for small and
 * medium sized tiles.
 */
export const TileTextOverlay = styled(ItemTileOverlay)`
    padding: 4px;
    background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.1) 0%,
        rgba(0, 0, 0, 0.5) 86.46%
    );
`;

/**
 * A variation of {@link TileTextOverlay} for use with larger tiles like the
 * {@link AllCollectionTile}.
 */
export const LargeTileTextOverlay = styled(ItemTileOverlay)`
    padding: 8px;
    background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.1) 0%,
        rgba(0, 0, 0, 0.5) 86.46%
    );
`;
