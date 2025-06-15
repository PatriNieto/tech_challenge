import styled from 'styled-components';
import Image from 'next/image';

export const MovieDetailContainer = styled.div`
    min-height: 80vh;
    color: #ffffff;
    position: relative;
    overflow: hidden;
`;

// Mobile Layout (default)
export const MobileLayout = styled.div`
    display: block;

    @media (min-width: 768px) {
        display: none;
    }
`;

// Desktop Layout
export const DesktopLayout = styled.div`
    display: none;
    flex-direction: column; // Cambiado de row a column
    width: 100%;

    @media (min-width: 768px) {
        display: flex;
    }
`;

export const DesktopMainContent = styled.div`
    display: flex;
    width: 100%;
    min-height: 500px; // Ajusta según necesites
`;

export const DesktopInfoGridSection = styled.div`
    display: flex;
    width: 100%;
    margin-top: 2rem;
    padding: 0 2rem;
    justify-content: flex-start;
`;

export const DesktopImageSection = styled.div`
    flex: 1;
    position: relative;
    overflow: hidden;
`;

export const DesktopImageOverlaySoft = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
        linear-gradient(
            to left,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.7) 20%,
            rgba(0, 0, 0, 0.3) 50%,
            transparent 70%
        ),
        linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0.4) 30%,
            rgba(0, 0, 0, 0.1) 60%,
            transparent 80%
        );
`;

export const DesktopContentSection = styled.div`
    flex: 1;
    padding: 3rem;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Cambiado de 'end' a 'space-between' */
`;

export const DesktopBackdropImage = styled(Image)`
    object-fit: cover;
    width: 100%;
    height: 100%;
`;

export const DesktopImageOverlay = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 200px;
    background: linear-gradient(to right, transparent 0%, rgba(26, 26, 26, 0.8) 50%, #1a1a1a 100%);
`;

export const MobileContainer = styled.div`
    position: relative;
    width: 100%;
    height: 30vh;
    overflow: hidden;
    border-radius: 5px;
    margin: 1rem 2rem;
    width: calc(100% - 4rem);
`;

export const MobileImage = styled(Image)`
    object-fit: cover;
    object-position: center 25%;
    width: 100%;
    height: 100%;
`;

export const BackdropOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.1) 0%,
        rgba(0, 0, 0, 0.3) 50%,
        rgba(26, 26, 26, 1) 85%
    );
`;

export const ContentContainer = styled.div`
    padding: 2rem 2rem 0 2rem;
    margin-top: -10vh;
    position: relative;
    z-index: 2;
`;

export const MovieTitle = styled.h1`
    font-size: 3.5rem;
    font-weight: 600;
    margin: 2rem 0 0.5rem 0;
    line-height: 1.1;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);

    @media (max-width: 768px) {
        font-size: 2rem;
        margin-top: 3rem;
    }
`;

export const MovieMetadata = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    gap: 1rem;

    @media (min-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        margin-bottom: 3rem;
        gap: 1.5rem;
    }

    @media (max-width: 767px) {
        align-items: flex-start;
        gap: 0;
    }
`;
export const MetadataLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: 400;
    flex: 1;

    @media (min-width: 768px) {
        gap: 0.8rem;
    }

    @media (max-width: 767px) {
        gap: 0.5rem;
        flex-direction: row;
        flex-wrap: wrap;
    }
`;

export const MetadataChip = styled.span`
    font-size: 1rem;
    white-space: nowrap;
    color: #ffffff;

    @media (min-width: 768px) {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 0.4rem 0.8rem;
        border-radius: 4px;
        font-size: 0.9rem;
    }

    @media (max-width: 767px) {
        background: none;
        border: none;
        padding: 0;
        color: #a0a0a0;
        font-size: 1.1rem; /* Reducido de 1.3rem para que se vea más como la imagen */

        &:not(:last-child)::after {
            content: ' | '; /* Añadido espacio antes y después del separador */
            margin: 0 0.3rem; /* Reducido el margen */
            color: rgba(68, 68, 68, 0.5);
        }
    }
`;

export const MobileRating = styled.div`
    color: #f9e139;
    font-size: 1.3rem;
    font-weight: 400;
    margin-left: auto;

    @media (min-width: 768px) {
        display: none;
    }
`;

export const RatingContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @media (min-width: 768px) {
        order: 0;
    }

    @media (max-width: 767px) {
        gap: 0;
    }
`;

export const IMDbLogo = styled.div`
    background: #f5c518;
    color: #000;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    font-weight: 700;
    font-size: 0.9rem;

    @media (max-width: 767px) {
        display: none;
    }
`;

export const RatingValue = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;

    @media (min-width: 768px) {
        font-weight: 400;
    }

    @media (max-width: 767px) {
        color: #f9e139;
        font-size: 1.2rem;
        font-weight: 400;
    }
`;

export const OverviewSection = styled.div`
    margin-bottom: 2rem;

    @media (min-width: 768px) {
        margin-bottom: 2rem; /* Reducido de 4rem */
    }

    h2 {
        font-size: 1.4rem;
        font-weight: 300;
        margin: 0 0 1rem 0;
        color: #ffffff;

        @media (min-width: 768px) {
            display: none;
        }
    }
`;

export const OverviewText = styled.p`
    font-size: 1.2rem;
    line-height: 1.6;
    color: #d0d0d0;
    margin: 0;
    max-width: none;

    @media (max-width: 767px) {
        color: #949494;
        font-size: 1.3rem;
    }

    @media (min-width: 768px) {
        max-width: 500px;
        color: #d0d0d0;
    }
`;

export const InfoGrid = styled.div`
    display: flex;
    max-width: 50%;
    justify-content: space-around;
    gap: 3rem;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1.5rem;
    }
`;
export const InfoSection = styled.div`
    h3 {
        color: #ffffff;
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
        font-weight: 200;
    }
`;

export const InfoList = styled.div`
    color: #d0d0d0;
    font-size: 1.2rem;

    line-height: 1.5;

    span {
        display: inline;
    }

    div {
        margin-bottom: 0.2rem;
    }
`;

export const BackButtonContainer = styled.div`
    display: flex;
    justify-content: center;

    @media (min-width: 768px) {
        justify-content: flex-start;
        margin-top: 2rem;
        position: absolute;
        bottom: 2rem;
        right: 3rem;
    }
`;
