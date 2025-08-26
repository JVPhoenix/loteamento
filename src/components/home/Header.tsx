import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import Head from "next/head";
import { usePathname, useRouter } from "next/navigation";
import { PageSelector, UserRoles } from "@/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import { Divider, ListItemIcon, ListItemText, MenuList } from "@mui/material";
import {
  DisplaySettingsOutlined,
  Logout,
  Search,
  AccountCircleOutlined,
  EventAvailableOutlined,
  EditCalendarOutlined,
  PriceChangeOutlined,
  PriceCheckOutlined,
  ArticleOutlined,
  LooksOneOutlined,
  LooksTwoOutlined,
} from "@mui/icons-material";

interface HeaderInterface {
  aboutRef: React.RefObject<HTMLDivElement>;
  maps1Ref: React.RefObject<HTMLDivElement>;
  maps2Ref: React.RefObject<HTMLDivElement>;
  contactRef: React.RefObject<HTMLDivElement>;
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
}

export default function Header(props: HeaderInterface) {
  // ROLES AND PAGES MANAGEMENT
  const page = usePathname();
  const Router = useRouter();
  const { user, isLoading } = useUser();
  const checkRoles = (role: string) => {
    if (user) {
      const userRoles: any = user.userRoles;
      return userRoles.includes(role) ? true : false;
    }
  };

  // NOT IMPLEMENTED
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElMapsPhase, setAnchorElMapsPhase] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenMapsPhaseMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMapsPhase(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseMapsPhaseMenu = () => {
    setAnchorElMapsPhase(null);
  };

  // PAGE HEADER NAME
  const handlePageHeader = () => {
    if (page === PageSelector.ErrorPage) {
      return "ERRO";
    } else if (page === PageSelector.HomePage) {
      return "Loteamento R. Martins";
    } else if (page === PageSelector.Photos) {
      return "Fotos";
    } else if (
      (checkRoles(UserRoles.Sales) || checkRoles(UserRoles.Admins) || checkRoles(UserRoles.Employee)) &&
      page === PageSelector.AdminSearch
    ) {
      return "Buscar Cliente";
    } else if (
      (checkRoles(UserRoles.Sales) || checkRoles(UserRoles.Admins) || checkRoles(UserRoles.Employee)) &&
      page === PageSelector.AdminReadjustClient
    ) {
      return "Simular Reajuste - Cliente";
    } else if (
      (checkRoles(UserRoles.Sales) || checkRoles(UserRoles.Admins) || checkRoles(UserRoles.Employee)) &&
      page === PageSelector.AdminReadjustSimulate
    ) {
      return "Simular Reajuste - Lote";
    } else if (
      (checkRoles(UserRoles.Sales) || checkRoles(UserRoles.Admins) || checkRoles(UserRoles.Employee)) &&
      page === PageSelector.AdminPersonalizedQuote
    ) {
      return "Orçamento Personalizado";
    } else if (
      (checkRoles(UserRoles.Sales) || checkRoles(UserRoles.Admins) || checkRoles(UserRoles.Employee)) &&
      page === PageSelector.AdminShowReservations
    ) {
      return "Ver Reservas";
    } else if (
      (checkRoles(UserRoles.Sales) || checkRoles(UserRoles.Admins) || checkRoles(UserRoles.Employee)) &&
      page === PageSelector.AdminEditReservations
    ) {
      return "Modificar Reservas";
    } else if (
      (checkRoles(UserRoles.Admins) || checkRoles(UserRoles.Employee)) &&
      page === PageSelector.AdminNewClient
    ) {
      return "Novo Cliente";
    } else if (page === PageSelector.ClientSearch) {
      return "Área do Cliente";
    } else if (page === PageSelector.MyProfile) {
      return "Meu Perfil";
    } else {
      return "ERRO - Sem Acesso";
    }
  };

  return (
    <>
      <Head>
        <title>{isLoading ? "Carregando..." : handlePageHeader()}</title>
      </Head>
      <AppBar
        position="static"
        sx={{
          "& .MuiButtonBase-root": {
            transition: "all 0.3s ease",
            ":hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
          },
        }}
      >
        <Container maxWidth={false} className="bg-black">
          <Toolbar disableGutters>
            {/* MOBILE VERSION */}
            <Link href={PageSelector.HomePage}>
              <Image
                className="hidden lg:flex py-2 w-[180px]"
                src="/logoLoteamento.png"
                width={500}
                height={200}
                alt="Logo do Site"
              />
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-app-bar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-app-bar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {!page ? null : page !== PageSelector.HomePage ? (
                  <Button
                    sx={{ textAlign: "left", width: "100%", px: 2, color: "inherit", display: "block" }}
                    onClick={() => Router.push(PageSelector.HomePage)}
                  >
                    Página Inicial
                  </Button>
                ) : (
                  <React.Fragment>
                    <Button
                      sx={{ textAlign: "left", width: "100%", px: 2, color: "inherit", display: "block" }}
                      onClick={() => (props.scrollToSection(props.aboutRef), handleCloseNavMenu())}
                    >
                      Sobre Nós
                    </Button>
                    <Button
                      sx={{ textAlign: "left", width: "100%", px: 2, color: "inherit", display: "block" }}
                      onClick={handleOpenMapsPhaseMenu}
                    >
                      Mapas
                    </Button>
                    <Button
                      sx={{ textAlign: "left", width: "100%", px: 2, color: "inherit", display: "block" }}
                      onClick={() => (props.scrollToSection(props.contactRef), handleCloseNavMenu())}
                    >
                      Contato
                    </Button>
                    <Button
                      sx={{ textAlign: "left", width: "100%", px: 2, color: "inherit", display: "block" }}
                      onClick={() => Router.push(PageSelector.Photos)}
                    >
                      Fotos
                    </Button>
                    <Button
                      sx={{ textAlign: "left", width: "100%", px: 2, color: "inherit", display: "block" }}
                      onClick={() => Router.push(PageSelector.ClientSearch)}
                    >
                      Área do Cliente
                    </Button>
                  </React.Fragment>
                )}
                <Menu
                  id="menu-maps-phases"
                  sx={{ mt: "45px" }}
                  anchorEl={anchorElMapsPhase}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElMapsPhase)}
                  onClose={handleCloseMapsPhaseMenu}
                >
                  <MenuList>
                    <MenuItem
                      onClick={() => (
                        props.scrollToSection(props.maps1Ref), handleCloseMapsPhaseMenu(), handleCloseNavMenu()
                      )}
                    >
                      <ListItemIcon>
                        <LooksOneOutlined />
                      </ListItemIcon>
                      <ListItemText>1ª Etapa</ListItemText>
                    </MenuItem>
                    <MenuItem
                      onClick={() => (
                        props.scrollToSection(props.maps2Ref), handleCloseMapsPhaseMenu(), handleCloseNavMenu()
                      )}
                    >
                      <ListItemIcon>
                        <LooksTwoOutlined />
                      </ListItemIcon>
                      <ListItemText>2ª Etapa</ListItemText>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Menu>
            </Box>

            {/* DESKTOP VERSION  */}
            <Typography
              sx={{
                flexGrow: 1,
              }}
            >
              <Link href={PageSelector.HomePage}>
                <Image
                  className="lg:hidden flex py-2 w-[180px]"
                  src="/logoLoteamento.png"
                  width={500}
                  height={200}
                  alt="Logo do Site"
                />
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 50, display: { xs: "none", md: "flex" } }}>
              {!page ? null : page !== PageSelector.HomePage ? (
                <Button
                  sx={{ mx: 1, color: "white", display: "block" }}
                  onClick={() => Router.push(PageSelector.HomePage)}
                >
                  Página Inicial
                </Button>
              ) : (
                <React.Fragment>
                  <Button
                    sx={{ mx: 1, color: "white", display: "block" }}
                    onClick={() => props.scrollToSection(props.aboutRef)}
                  >
                    Sobre Nós
                  </Button>
                  <Button sx={{ mx: 1, color: "white", display: "block" }} onClick={handleOpenMapsPhaseMenu}>
                    Mapas
                  </Button>
                  <Button
                    sx={{ mx: 1, color: "white", display: "block" }}
                    onClick={() => props.scrollToSection(props.contactRef)}
                  >
                    Contato
                  </Button>
                  <Button
                    sx={{ mx: 1, color: "white", display: "block" }}
                    onClick={() => Router.push(PageSelector.Photos)}
                  >
                    Fotos
                  </Button>
                  <Button
                    sx={{ mx: 1, color: "white", display: "block" }}
                    onClick={() => Router.push(PageSelector.ClientSearch)}
                  >
                    Área do Cliente
                  </Button>
                </React.Fragment>
              )}
              <Menu
                id="menu-maps-phases"
                sx={{ mt: "45px" }}
                anchorEl={anchorElMapsPhase}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElMapsPhase)}
                onClose={handleCloseMapsPhaseMenu}
              >
                <MenuList>
                  <MenuItem onClick={() => (props.scrollToSection(props.maps1Ref), handleCloseMapsPhaseMenu())}>
                    <ListItemIcon>
                      <LooksOneOutlined />
                    </ListItemIcon>
                    <ListItemText>1ª Etapa</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => (props.scrollToSection(props.maps2Ref), handleCloseMapsPhaseMenu())}>
                    <ListItemIcon>
                      <LooksTwoOutlined />
                    </ListItemIcon>
                    <ListItemText>2ª Etapa</ListItemText>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>

            {/* USER LOGIN / PROFILE -> OPTIONS */}
            <Box sx={{ flexGrow: 0 }}>
              {!isLoading &&
                (!user ? (
                  <Button variant="text" sx={{ color: "white" }} href={PageSelector.Login}>
                    <h1>LOGIN</h1>
                  </Button>
                ) : (
                  <>
                    <Tooltip title="Abrir Opções">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ":hover": { scale: "110%" } }}>
                        <Avatar alt="User Avatar" src={`${user.picture}`} />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{
                        mt: "45px",
                        "& .MuiPaper-root .MuiMenuItem-root": {
                          transition: "all 0.3s ease",
                          ":hover": { backgroundColor: "rgba(0, 0, 0, 0.3)" },
                        },
                      }}
                      id="user-app-box"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuList>
                        <MenuItem onClick={() => Router.push(PageSelector.MyProfile)}>
                          <ListItemIcon>
                            <AccountCircleOutlined />
                          </ListItemIcon>
                          <ListItemText>Meu Perfil</ListItemText>
                        </MenuItem>
                        <Divider />

                        {/* ADMINS & AGENTS - OPTIONS */}
                        {checkRoles(UserRoles.Admins) ||
                        checkRoles(UserRoles.Sales) ||
                        checkRoles(UserRoles.Employee) ? (
                          <React.Fragment>
                            <MenuItem onClick={() => Router.push(PageSelector.AdminSearch)}>
                              <ListItemIcon>
                                <Search />
                              </ListItemIcon>
                              <ListItemText>Buscar</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => Router.push(PageSelector.AdminShowReservations)}>
                              <ListItemIcon>
                                <EventAvailableOutlined />
                              </ListItemIcon>
                              <ListItemText>Ver Reservas</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => Router.push(PageSelector.AdminEditReservations)}>
                              <ListItemIcon>
                                <EditCalendarOutlined />
                              </ListItemIcon>
                              <ListItemText>Modificar Reservas</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => Router.push(PageSelector.AdminPersonalizedQuote)}>
                              <ListItemIcon>
                                <DisplaySettingsOutlined />
                              </ListItemIcon>
                              <ListItemText>Orçamentos Personalizados</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => Router.push(PageSelector.AdminReadjustSimulate)}>
                              <ListItemIcon>
                                <PriceChangeOutlined />
                              </ListItemIcon>
                              <ListItemText>Simular Reajuste</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => Router.push(PageSelector.AdminReadjustClient)}>
                              <ListItemIcon>
                                <PriceCheckOutlined />
                              </ListItemIcon>
                              <ListItemText>Reajuste de Cliente</ListItemText>
                            </MenuItem>
                          </React.Fragment>
                        ) : (
                          <MenuItem>
                            <ListItemIcon>
                              <ArticleOutlined />
                            </ListItemIcon>
                            <ListItemText>Meus Contratos</ListItemText>
                          </MenuItem>
                        )}

                        <Divider />
                        <MenuItem onClick={() => Router.push(PageSelector.Logout)}>
                          <ListItemIcon>
                            <Logout />
                          </ListItemIcon>
                          <ListItemText>Desconectar</ListItemText>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </>
                ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
