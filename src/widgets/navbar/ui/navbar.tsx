import { Accordion, Button, Flex } from "@mantine/core";
import { useNavigate } from "react-router";
import { Fragment } from "react/jsx-runtime";
import { RoleEnum } from "~/shared/enums/role-enum";
import If from "~/shared/lib/components/if";
import VisibleForRoles from "~/shared/lib/components/visible-for-roles";
import { routes, TRoute } from "~/shared/router/router";

const RenderSidebarItem = ({ routes }: { routes: TRoute[] }) => {
  const navigate = useNavigate();

  return (
    <Flex direction={"column"} gap={10}>
      {routes.map((item, index) => (
        <Fragment key={item.path + "=" + item.title}>
          <If
            when={
              item.sidebar &&
              item.childrens &&
              item.childrens.length > 0 &&
              item.title &&
              item.path
            }
            elseComponent={
              <div>
                {(() => {
                  console.log(item);
                  return <></>;
                })()}
                <If
                  when={item.sidebar && item.title && item.path}
                  elseComponent={
                    <RenderSidebarItem routes={item.childrens ?? []} />
                  }
                >
                  <VisibleForRoles
                    roles={
                      item.visibleForRole || [
                        RoleEnum.ADMIN,
                        RoleEnum.EDUCATOR,
                        RoleEnum.student,
                      ]
                    }
                  >
                    <Button
                      onClick={() => navigate(item.path!)}
                      w={"100%"}
                      variant={"light"}
                    >
                      {item.title}
                    </Button>
                  </VisibleForRoles>
                </If>
              </div>
            }
          >
            <Accordion>
              <Accordion.Item
                key={item.path + "_" + index}
                value={item.title ?? ""}
              >
                <Accordion.Control icon={item.icon}>
                  {item.title}
                </Accordion.Control>
                <Accordion.Panel>
                  <RenderSidebarItem routes={item.childrens ?? []} />
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </If>
        </Fragment>
      ))}
    </Flex>
  );
};

const Sidebar = () => {
  return (
    <div>
      <RenderSidebarItem routes={routes} />
    </div>
  );
};

export default Sidebar;
